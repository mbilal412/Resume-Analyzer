import { Webhook } from 'svix'
import User from '../models/user.model.js'
import { sendSuccess, sendError } from '../utils/response.js'

export const handleClerkWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if(!WEBHOOK_SECRET) {
    console.error('Webhook secret not configured in environment');
    return sendError(res, "Something went wrong on our end. Please try again.", 500)
  }

  const svix_id = req.headers['svix-id']
  const svix_timestamp = req.headers['svix-timestamp']
  const svix_signature = req.headers['svix-signature']

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return sendError(res, "Invalid request. Please try again.", 400)
  }

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt

  try {
    evt = wh.verify(req.body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    })
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return sendError(res, "Request could not be verified. Please try again.", 400)
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, first_name, last_name, email_addresses } = evt.data

    if(!email_addresses || email_addresses.length === 0){
      return sendError(res, "Account setup failed. Please try again.", 400)
    }

    if (!id || !Array.isArray(email_addresses) || !email_addresses[0]?.email_address) {
      return sendError(res, "Account setup failed. Please try again.", 400)
    }

    try {
      await User.findOneAndUpdate(
        { clerkId: id },
        {
          $setOnInsert: {
            clerkId: id,
            firstName: first_name || email_addresses[0].email_address.split('@')[0],
            lastName: last_name || '',
            email: email_addresses[0].email_address
          }
        },
        { upsert: true, returnDocument: 'after' }
      )
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error, user already exists, skip
      } else {
        console.error('Error creating user from webhook:', error);
        return sendError(res, "Something went wrong creating your account. Please try again.", 500)
      }
    }
  }

  else if (eventType === 'user.updated') {
    const { id, first_name, last_name, email_addresses } = evt.data

    if(!email_addresses || email_addresses.length === 0){
      return sendError(res, "Account update failed. Please try again.", 400)
    }

    if (!id || !Array.isArray(email_addresses) || !email_addresses[0]?.email_address) {
      return sendError(res, "Account update failed. Please try again.", 400)
    }

    try {
      await User.findOneAndUpdate(
        { clerkId: id },
        {
          firstName: first_name || email_addresses[0].email_address.split('@')[0],
          lastName: last_name || '',
          email: email_addresses[0].email_address
        }
      )
    } catch (error) {
      console.error('Error updating user from webhook:', error);
      return sendError(res, "Something went wrong updating your account. Please try again.", 500)
    }
  }

  else if (eventType === 'user.deleted') {
    const { id } = evt.data

    if (!id) {
      return sendError(res, "Account deletion failed. Please try again.", 400)
    }

    try {
      await User.findOneAndDelete({ clerkId: id })
    } catch (error) {
      console.error('Error deleting user from webhook:', error);
      return sendError(res, "Something went wrong deleting your account. Please try again.", 500)
    }
  }

  return sendSuccess(res, "Webhook received", undefined, 200)
}
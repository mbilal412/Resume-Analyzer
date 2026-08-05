import { Webhook } from 'svix'
import User from '../models/user.model.js'

export const handleClerkWebhook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  const svix_id = req.headers['svix-id']
  const svix_timestamp = req.headers['svix-timestamp']
  const svix_signature = req.headers['svix-signature']

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ message: 'Missing svix headers' })
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
    return res.status(400).json({ message: 'Webhook verification failed' })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, first_name, last_name, email_addresses } = evt.data

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
        // Duplicate key error, matlab dusri request ne already bana diya, ignore karo
        console.log('User already exists, skipping duplicate creation')
      } else {
        throw error
      }
    }

  }

  res.status(200).json({ message: 'Webhook received' })
}
import { getAuth } from "@clerk/express";

export const getMeController = (req, res) => {
    const auth = getAuth(req);

    if(!auth || !auth.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    res.status(200).json({ userId: auth.userId });
}
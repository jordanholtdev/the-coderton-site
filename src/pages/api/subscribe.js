import fetch from 'isomorphic-fetch';

export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required!' });
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const DATACENTER = process.env.MAILCHIMP_DC;

    const data = {
      email_address: email,
      status: 'subscribed',
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter. Send me an email at [jordan@jordanholt.dev] and I'll add you to the list.`,
      });
    }
    return res.status(201).json({ error: '' });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

import groq from "./aiClient.js";

const systemPrompt = `You are a travel planner for a holiday rental website in India.

Create a day-by-day trip plan from the details the user gives you.

Rules:
1. Give exactly one entry per day of the trip.
2. Each day needs a short title and 3 to 4 activities.
3. Write each activity as "Morning: ...", "Afternoon: ...", or "Evening: ...".
4. Keep the plan inside the budget the user gave, and say roughly what things cost in rupees.
5. Match the activities to the interests the user picked.
6. Only suggest places that really exist in that destination. Do not invent places.
7. Keep the language simple and friendly.
8. Do not use emojis.

Reply with ONLY this JSON shape:
{
  "summary": "two sentences about the trip",
  "days": [
    { "day": 1, "title": "short title", "activities": ["Morning: ...", "Afternoon: ...", "Evening: ..."] }
  ],
  "tips": ["short tip", "short tip", "short tip"]
}`;

const planTrip = async (trip) => {
  if (!groq) {
    const days = Array.from({ length: Number(trip.days || 1) }, (_, index) => ({
      day: index + 1,
      title: `Explore ${trip.destination || "your destination"}`,
      activities: [
        "Morning: Start with a relaxed breakfast and a short walk in the local area.",
        "Afternoon: Visit the main attractions suited to your interests and budget.",
        "Evening: Enjoy a local food stop and return to your stay.",
      ],
    }));

    return {
      summary: `A simple ${trip.days || 1}-day plan for ${trip.destination || "your trip"} designed around your budget and interests.`,
      days,
      tips: [
        "Keep your budget flexible for food and local transport.",
        "Book popular activities early if the destination is busy.",
        "Use your time to balance sightseeing with rest.",
      ],
    };
  }

  const tripInfo = `- Destination: ${trip.destination}
- Total Budget: Rs ${trip.budget}
- Number of Days: ${trip.days}
- Number of People: ${trip.people}
- Interests: ${trip.interests.join(", ")}`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    max_tokens: 2000,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: tripInfo },
    ],
  });

  return JSON.parse(completion.choices[0].message.content);
};

export { planTrip };

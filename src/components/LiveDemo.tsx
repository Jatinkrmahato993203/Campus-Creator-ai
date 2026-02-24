import React, { useState } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import { Loader2, CheckCircle2, Copy, Play } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function LiveDemo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [eventDetails, setEventDetails] = useState({
    event_name: "Intro to Reinforcement Learning Workshop",
    event_type: "workshop",
    date_time: "Mar 15, 2026 — 6:00 PM",
    venue: "Room 210, Engineering Building",
    target_audience: "all students, primarily 2nd–4th years",
    key_highlights:
      "hands-on RL coding session, pre-built environments, live Q&A with PhD student",
  });

  const [styleProfile, setStyleProfile] = useState({
    club_name: "AI Club",
    preferred_tone: "serious and technical",
    emoji_usage: "minimal",
    formality: 8,
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = `You are an expert marketing copywriter for college student organizations.
Generate a promotional kit for the following event, strictly adhering to the club's style profile.

CLUB STYLE PROFILE:
Club Name: ${styleProfile.club_name}
Preferred Tone: ${styleProfile.preferred_tone}
Emoji Usage: ${styleProfile.emoji_usage}
Formality (1-10): ${styleProfile.formality}

EVENT DETAILS:
Name: ${eventDetails.event_name}
Type: ${eventDetails.event_type}
Date/Time: ${eventDetails.date_time}
Venue: ${eventDetails.venue}
Target Audience: ${eventDetails.target_audience}
Key Highlights: ${eventDetails.key_highlights}

INSTRUCTIONS:
1. Maintain the preferred tone.
2. Formality level is ${styleProfile.formality}/10.
3. Emoji usage should be: ${styleProfile.emoji_usage}.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              poster_copy: {
                type: Type.STRING,
                description:
                  "Short, punchy text for a printed poster. Include a headline, subheadline, and essential details.",
              },
              instagram_caption: {
                type: Type.STRING,
                description:
                  "Engaging caption formatted for Instagram. Include default hashtags.",
              },
              whatsapp_text: {
                type: Type.STRING,
                description:
                  "Concise, scannable message for group chats. Use bullet points if helpful.",
              },
              email_body: {
                type: Type.STRING,
                description:
                  "Formal email draft for the student mailing list. Include subject line.",
              },
              taglines: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "5 catchy taglines",
              },
              linkedin_post: {
                type: Type.STRING,
                description:
                  "Professional post highlighting the career/academic value of the event.",
              },
            },
            required: [
              "poster_copy",
              "instagram_caption",
              "whatsapp_text",
              "email_body",
              "taglines",
              "linkedin_post",
            ],
          },
        },
      });

      if (response.text) {
        setResult(JSON.parse(response.text));
      }
    } catch (error) {
      console.error("Error generating kit:", error);
      alert("Failed to generate kit. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
          Live Prototype
        </h2>
        <p className="text-zinc-500 mt-2">
          Generate a promotional kit using the Gemini API.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Input Form */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs mr-2">
                1
              </span>
              Style Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Club Name
                </label>
                <input
                  type="text"
                  value={styleProfile.club_name}
                  onChange={(e) =>
                    setStyleProfile({
                      ...styleProfile,
                      club_name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Preferred Tone
                </label>
                <input
                  type="text"
                  value={styleProfile.preferred_tone}
                  onChange={(e) =>
                    setStyleProfile({
                      ...styleProfile,
                      preferred_tone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Emoji Usage
                  </label>
                  <select
                    value={styleProfile.emoji_usage}
                    onChange={(e) =>
                      setStyleProfile({
                        ...styleProfile,
                        emoji_usage: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="none">None</option>
                    <option value="minimal">Minimal</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Formality (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={styleProfile.formality}
                    onChange={(e) =>
                      setStyleProfile({
                        ...styleProfile,
                        formality: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs mr-2">
                2
              </span>
              Event Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventDetails.event_name}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      event_name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Event Type
                  </label>
                  <input
                    type="text"
                    value={eventDetails.event_type}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        event_type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="text"
                    value={eventDetails.date_time}
                    onChange={(e) =>
                      setEventDetails({
                        ...eventDetails,
                        date_time: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Venue
                </label>
                <input
                  type="text"
                  value={eventDetails.venue}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, venue: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={eventDetails.target_audience}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      target_audience: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Key Highlights
                </label>
                <textarea
                  rows={3}
                  value={eventDetails.key_highlights}
                  onChange={(e) =>
                    setEventDetails({
                      ...eventDetails,
                      key_highlights: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-medium flex items-center justify-center transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating
                Kit...
              </>
            ) : (
              "Generate Promotional Kit"
            )}
          </button>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold flex items-center text-emerald-700">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Kit Generated Successfully
                </h3>
              </div>

              <ResultCard title="Poster Copy" content={result.poster_copy} />
              <ResultCard
                title="Instagram Caption"
                content={result.instagram_caption}
              />
              <ResultCard
                title="WhatsApp Text"
                content={result.whatsapp_text}
              />
              <ResultCard title="Email Draft" content={result.email_body} />
              <ResultCard
                title="LinkedIn Post"
                content={result.linkedin_post}
              />

              <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
                  <h4 className="font-semibold text-sm text-zinc-700">
                    Taglines
                  </h4>
                </div>
                <div className="p-4">
                  <ul className="list-disc list-inside space-y-2 text-sm text-zinc-700">
                    {result.taglines?.map((tagline: string, i: number) => (
                      <li key={i}>{tagline}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400 p-8 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-zinc-300" />
              </div>
              <p className="font-medium text-zinc-600">No kit generated yet</p>
              <p className="text-sm mt-1 max-w-sm">
                Fill out the event details and click generate to see the Campus
                Creator AI in action.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ title, content }: { title: string; content: string }) {
  const handleCopy = () => navigator.clipboard.writeText(content);
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-zinc-50 px-4 py-3 border-b border-zinc-200 flex justify-between items-center">
        <h4 className="font-semibold text-sm text-zinc-700">{title}</h4>
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-zinc-600 transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4 text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
        {content}
      </div>
    </div>
  );
}

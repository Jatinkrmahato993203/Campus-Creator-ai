import React from "react";
import { Copy } from "lucide-react";

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="mb-12">
    <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 mb-4 pb-2 border-b border-zinc-200">
      {title}
    </h2>
    <div className="space-y-4 text-zinc-700 leading-relaxed">{children}</div>
  </section>
);

const CodeBlock = ({
  code,
  language = "text",
}: {
  code: string;
  language?: string;
}) => {
  const handleCopy = () => navigator.clipboard.writeText(code);
  return (
    <div className="relative group rounded-xl overflow-hidden bg-zinc-900 my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
        <span className="text-xs font-mono text-zinc-400">{language}</span>
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-zinc-50 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export function DocumentView() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4">
          Campus Creator AI for Clubs
        </h1>
        <p className="text-lg text-zinc-500">
          Product Strategy, Technical Architecture, and Hackathon Implementation
          Plan
        </p>
      </div>

      <Section id="executive-summary" title="Executive Summary">
        <p>
          <strong>Campus Creator AI</strong> is a specialized content generation
          engine designed for college student organizations. It solves the
          persistent problem of inconsistent, time-consuming event promotion by
          transforming minimal event details into a cohesive, multi-platform
          promotional kit.
        </p>
        <p>
          The system leverages three core differentiators:{" "}
          <strong>Brand Tone Lock</strong> (Style Memory) ensures all outputs
          adhere to the club's specific voice and visual identity; the{" "}
          <strong>Platform Adaptor</strong> automatically tailors messaging for
          Instagram, WhatsApp, Email, and LinkedIn; and the{" "}
          <strong>Engagement Predictor</strong> applies rule-based heuristics to
          optimize content for maximum student reach. This tool empowers student
          leaders to produce professional-grade marketing in seconds, allowing
          them to focus on community building rather than copywriting.
        </p>
      </Section>

      <Section id="ux-flow" title="UX Flow">
        <ol className="list-decimal list-inside space-y-3 marker:text-zinc-400 marker:font-medium">
          <li>
            <strong>Onboarding:</strong> Club officer creates a profile. UI
            presents a form to input club name, type, brand colors (color
            picker), logo upload, and sliders for tone (e.g., Casual ↔ Formal,
            Emoji Density).
          </li>
          <li>
            <strong>Event Creation:</strong> User clicks "New Campaign". A clean
            form requests core event details: Event Name, Type, Date/Time,
            Venue, Target Audience, and Key Highlights.
          </li>
          <li>
            <strong>Generation & Processing:</strong> System displays a loading
            state with Engagement Predictor insights (e.g., "Optimizing for
            1st-year students...").
          </li>
          <li>
            <strong>Review & Edit (The Kit):</strong> A dashboard presents the
            generated assets in platform-specific cards (Instagram preview,
            WhatsApp chat bubble, Email draft, Poster image). User can edit text
            inline or click "Regenerate".
          </li>
          <li>
            <strong>Publish & Feedback:</strong> User copies the content or
            downloads the poster. A simple feedback prompt asks, "Did this match
            your club's voice?" (1-5 stars), which updates the Style Memory.
          </li>
        </ol>
      </Section>

      <Section id="data-model" title="Data Model (JSON Schema)">
        <p>
          The Style Profile is the core data structure that enforces brand
          consistency across generations.
        </p>
        <CodeBlock
          language="json"
          code={`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Club Style Profile",
  "type": "object",
  "properties": {
    "club_name": { "type": "string" },
    "club_type": { "type": "string" },
    "preferred_tone": { "type": "string" },
    "emoji_usage": { "type": "string", "enum": ["none", "minimal", "moderate", "heavy"] },
    "formality": { "type": "integer", "minimum": 1, "maximum": 10 },
    "brand_colors": {
      "type": "array",
      "items": { "type": "string", "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" }
    },
    "logo_url": { "type": "string", "format": "uri" },
    "preferred_hashtag_style": { "type": "string" },
    "default_hashtags": { "type": "array", "items": { "type": "string" } },
    "audience_segments": { "type": "array", "items": { "type": "string" } },
    "preferred_length_limits": {
      "type": "object",
      "properties": {
        "instagram": { "type": "integer" },
        "whatsapp": { "type": "integer" },
        "email": { "type": "integer" },
        "linkedin": { "type": "integer" }
      }
    },
    "typography_suggestions": { "type": "string" },
    "poster_template_id": { "type": "string" }
  }
}`}
        />
        <h3 className="text-lg font-medium mt-8 mb-2">
          Example Saved Profile ("AI Club")
        </h3>
        <CodeBlock
          language="json"
          code={`{
  "club_name": "AI Club",
  "club_type": "Academic/Technology",
  "preferred_tone": "serious and technical",
  "emoji_usage": "minimal",
  "formality": 8,
  "brand_colors": ["#0B3D91", "#CCCCCC"],
  "logo_url": "https://example.com/aiclub_logo.png",
  "preferred_hashtag_style": "camelCase, technical focus",
  "default_hashtags": ["#ArtificialIntelligence", "#TechAtCampus"],
  "audience_segments": ["CS majors", "Engineering students", "Grad students"],
  "preferred_length_limits": {
    "instagram": 150,
    "whatsapp": 100,
    "email": 400,
    "linkedin": 200
  },
  "typography_suggestions": "Sans-serif, clean, monospace accents",
  "poster_template_id": "tpl_tech_01"
}`}
        />
      </Section>

      <Section id="tech-architecture" title="Tech Architecture">
        <h3 className="text-lg font-medium mb-2">
          Stack A: Fastest Hackathon Build (Recommended)
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <strong>Frontend:</strong> React + Vite + Tailwind CSS (Fast
            iteration, pre-built components).
          </li>
          <li>
            <strong>Backend:</strong> Next.js API Routes or Express.js (Simple,
            unified codebase).
          </li>
          <li>
            <strong>LLM Provider:</strong> Google Gemini API (Fast, structured
            JSON output, generous free tier).
          </li>
          <li>
            <strong>Storage:</strong> Firebase Firestore or LocalStorage (Zero
            setup for MVP).
          </li>
          <li>
            <strong>Poster Generation:</strong> HTML/CSS to Image using{" "}
            <code>html-to-image</code> on the client side (No backend rendering
            needed).
          </li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Stack B: Polished Demo</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Frontend:</strong> Next.js + Tailwind CSS + Framer Motion.
          </li>
          <li>
            <strong>Backend:</strong> Node.js + Express.
          </li>
          <li>
            <strong>LLM Provider:</strong> Google Gemini API.
          </li>
          <li>
            <strong>Storage:</strong> Supabase (PostgreSQL).
          </li>
          <li>
            <strong>Poster Generation:</strong> Gemini 2.5 Flash Image or DALL-E
            3 API for generative backgrounds, overlaid with HTML text.
          </li>
        </ul>
      </Section>

      <Section id="api-spec" title="Minimal API/Endpoint Spec">
        <div className="space-y-6">
          <div>
            <h4 className="font-mono text-sm font-semibold bg-zinc-100 inline-block px-2 py-1 rounded">
              POST /api/generate
            </h4>
            <p className="text-sm mt-2">
              <strong>Input:</strong>{" "}
              <code>{`{ event_details: Object, style_profile: Object }`}</code>
            </p>
            <p className="text-sm">
              <strong>Output:</strong>{" "}
              <code>{`{ kit: { poster_copy, instagram_caption, whatsapp_text, email_body, taglines, linkedin_post } }`}</code>
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              <em>Pseudocode:</em> Assemble master prompt using event_details
              and style_profile. Call LLM API with JSON schema enforcement.
              Return parsed JSON.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-sm font-semibold bg-zinc-100 inline-block px-2 py-1 rounded">
              POST /api/save-profile
            </h4>
            <p className="text-sm mt-2">
              <strong>Input:</strong> <code>{`{ profile: Object }`}</code>
            </p>
            <p className="text-sm">
              <strong>Output:</strong>{" "}
              <code>{`{ success: boolean, id: string }`}</code>
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              <em>Pseudocode:</em> Validate against JSON schema. Save to
              DB/LocalStorage.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-sm font-semibold bg-zinc-100 inline-block px-2 py-1 rounded">
              GET /api/profiles/:id
            </h4>
            <p className="text-sm mt-2">
              <strong>Output:</strong> <code>{`{ profile: Object }`}</code>
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              <em>Pseudocode:</em> Fetch profile from DB by ID.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-sm font-semibold bg-zinc-100 inline-block px-2 py-1 rounded">
              POST /api/feedback
            </h4>
            <p className="text-sm mt-2">
              <strong>Input:</strong>{" "}
              <code>{`{ profile_id: string, rating: number, generated_kit_id: string }`}</code>
            </p>
            <p className="text-sm">
              <strong>Output:</strong>{" "}
              <code>{`{ success: boolean, new_weights: Object }`}</code>
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              <em>Pseudocode:</em> Retrieve profile. If rating &gt; 4, slightly
              increase formality/emoji weights used in the kit. Save updated
              profile.
            </p>
          </div>
        </div>
      </Section>

      <Section id="prompt-templates" title="Prompt Templates (Text LLM)">
        <h3 className="text-lg font-medium mb-2">Master Generation Prompt</h3>
        <CodeBlock
          language="text"
          code={`You are an expert marketing copywriter for college student organizations.
Generate a promotional kit for the following event, strictly adhering to the club's style profile.

CLUB STYLE PROFILE:
{{club_profile}}

EVENT DETAILS:
Name: {{event_name}}
Type: {{event_type}}
Date/Time: {{date_time}}
Venue: {{venue}}
Target Audience: {{target_audience}}
Key Highlights: {{key_highlights}}

INSTRUCTIONS:
1. Maintain the preferred tone: {{preferred_tone}}.
2. Formality level is {{formality}}/10.
3. Emoji usage should be: {{emoji_usage}}.
4. Output MUST be valid JSON matching the following schema exactly:
{
  "poster_copy": "Short, punchy text for a printed poster. Include a headline, subheadline, and essential details.",
  "instagram_caption": "Engaging caption formatted for Instagram. Include default hashtags.",
  "whatsapp_text": "Concise, scannable message for group chats. Use bullet points if helpful.",
  "email_body": "Formal email draft for the student mailing list. Include subject line.",
  "taglines": ["Tagline 1", "Tagline 2", "Tagline 3", "Tagline 4", "Tagline 5"],
  "linkedin_post": "Professional post highlighting the career/academic value of the event."
}`}
        />

        <h3 className="text-lg font-medium mt-8 mb-2">
          Platform Adaptor Prompt (In-context rewrite)
        </h3>
        <CodeBlock
          language="text"
          code={`Rewrite the following event blurb specifically for {{platform}}.
Adhere to the club style profile: {{club_profile}}.
Platform constraints: Max length {{max_length}} words. Tone should be optimized for {{platform_audience}}.

Event Blurb:
{{canonical_blurb}}`}
        />
      </Section>

      <Section id="image-generation" title="Image-Generation Prompt">
        <h3 className="text-lg font-medium mb-2">
          Option 1: HTML/CSS Render (Recommended)
        </h3>
        <p className="mb-4">
          Use Puppeteer or client-side <code>html-to-image</code>. Template
          placeholders: <code>{`{{headline}}`}</code>,{" "}
          <code>{`{{date_time}}`}</code>, <code>{`{{venue}}`}</code>. Apply CSS
          variables for <code>{`{{brand_color_1}}`}</code>.
        </p>

        <h3 className="text-lg font-medium mb-2">
          Option 2: Generative Image Model Prompt
        </h3>
        <CodeBlock
          language="text"
          code={`A minimalist, professional poster background for a college technology club event.
Theme: {{event_type}} about {{event_name}}.
Mood: {{preferred_tone}}, academic, modern.
Visual elements: Abstract geometric shapes, subtle neural network nodes, clean lines.
Colors: Primary {{brand_color_1}}, Secondary {{brand_color_2}}.
Layout: Leave the top-left corner empty for a logo. Leave the center empty for typography.
Style: Flat vector art, corporate memphis, highly polished.
Negative prompt: No text, no words, no watermarks, no cartoonish characters, no messy details.
Aspect Ratio: 4:5`}
        />

        <h4 className="font-medium mt-4 mb-2">Filled Example for AI Club:</h4>
        <CodeBlock
          language="text"
          code={`A minimalist, professional poster background for a college technology club event.
Theme: workshop about Intro to Reinforcement Learning Workshop.
Mood: serious and technical, academic, modern.
Visual elements: Abstract geometric shapes, subtle neural network nodes, clean lines.
Colors: Primary #0B3D91, Secondary #CCCCCC.
Layout: Leave the top-left corner empty for a logo. Leave the center empty for typography.
Style: Flat vector art, corporate memphis, highly polished.
Negative prompt: No text, no words, no watermarks, no cartoonish characters, no messy details.
Aspect Ratio: 4:5`}
        />
      </Section>

      <Section id="engagement-predictor" title="Engagement Predictor Rules">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <code>
              IF event_type == "workshop" AND target_audience CONTAINS "1st
              years" THEN
            </code>{" "}
            Recommend CTA: "No prior experience required. Bring your laptop!"
          </li>
          <li>
            <code>
              IF platform == "whatsapp" AND time_to_event &lt; 24h THEN
            </code>{" "}
            Prefix message with "🚨 TOMORROW:" and keep under 50 words.
          </li>
          <li>
            <code>IF key_highlights CONTAINS "food" OR "pizza" THEN</code> Move
            food mention to the first sentence of Instagram and WhatsApp copy.
          </li>
          <li>
            <code>IF formality &gt; 7 AND platform == "linkedin" THEN</code>{" "}
            Include a sentence about "networking opportunities" and "skill
            development."
          </li>
          <li>
            <code>IF emoji_usage == "minimal" THEN</code> Restrict emojis to
            structural use only (e.g., 📅 for date, 📍 for location).
          </li>
        </ul>
      </Section>

      <Section id="feedback-logic" title="Feedback & Style Memory Update Logic">
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Representation:</strong> Style weights are stored as floats
            (0.0 to 1.0) or integers (1 to 10) in the profile.
          </li>
          <li>
            <strong>Update Logic:</strong>
            <ul className="list-[circle] list-inside ml-6 mt-2 space-y-1">
              <li>User rates generated kit 1-5.</li>
              <li>
                <code>IF rating &gt;= 4</code>: Reinforce current style
                parameters.
                <br />
                <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded">
                  profile.formality = profile.formality * 0.9 +
                  current_generation_formality * 0.1
                </code>
              </li>
              <li>
                <code>IF rating &lt;= 2</code>: Prompt user for specific issue
                (e.g., "Too casual?"). Adjust weight in opposite direction.
                <br />
                <code className="text-xs bg-zinc-100 px-1 py-0.5 rounded">
                  IF issue == "too casual" THEN profile.formality = min(10,
                  profile.formality + 1)
                </code>
              </li>
            </ul>
          </li>
          <li>
            <strong>Cold Start:</strong> Use default templates based on{" "}
            <code>club_type</code> until 3 feedback events are recorded.
          </li>
        </ul>
      </Section>

      <Section id="sample-kit" title="Sample Generated Kit">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <h4 className="font-semibold text-zinc-900 mb-4 border-b pb-2">
            Event: Intro to Reinforcement Learning Workshop (AI Club)
          </h4>

          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
                Poster Copy
              </h5>
              <p className="text-sm">
                <strong>Headline:</strong> Master Reinforcement Learning.
              </p>
              <p className="text-sm">
                <strong>Subhead:</strong> Hands-on coding session with pre-built
                environments.
              </p>
              <p className="text-sm">
                <strong>Details:</strong> Mar 15, 2026 — 6:00 PM | Room 210,
                Engineering Building.
              </p>
            </div>

            <div>
              <h5 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
                Instagram Caption
              </h5>
              <p className="text-sm whitespace-pre-wrap">
                Dive into the mechanics of AI. Join the AI Club for an intensive
                Intro to Reinforcement Learning Workshop. We will utilize
                pre-built environments for a hands-on coding session, followed
                by a live Q&A with a PhD researcher. Open to all students;
                highly recommended for 2nd-4th years. 📅 Mar 15, 6:00 PM 📍 Room
                210, Engineering Bldg. #ArtificialIntelligence #TechAtCampus
                #ReinforcementLearning
              </p>
            </div>

            <div>
              <h5 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
                WhatsApp Text
              </h5>
              <p className="text-sm whitespace-pre-wrap">
                AI Club: Intro to Reinforcement Learning Workshop • What:
                Hands-on RL coding session & PhD Q&A • When: Mar 15, 2026 — 6:00
                PM • Where: Room 210, Engineering Building Pre-built
                environments provided. Ideal for 2nd-4th year students.
              </p>
            </div>

            <div>
              <h5 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
                Email Body
              </h5>
              <p className="text-sm whitespace-pre-wrap">
                Subject: Invitation: Intro to Reinforcement Learning Workshop -
                AI Club Dear Students, The AI Club invites you to our upcoming
                workshop on Reinforcement Learning, scheduled for March 15,
                2026, at 6:00 PM in Room 210, Engineering Building. This session
                will feature hands-on coding utilizing pre-built environments,
                designed to provide practical experience with RL algorithms. The
                workshop will conclude with a live Q&A session hosted by a PhD
                student specializing in the field. While open to all students,
                the content is primarily targeted towards 2nd through 4th-year
                students. We look forward to your attendance. Sincerely, The AI
                Club
              </p>
            </div>

            <div>
              <h5 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
                Taglines
              </h5>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>
                  "Train Your First Agent. Master Reinforcement Learning."
                </li>
                <li>"From Theory to Code: Applied Reinforcement Learning."</li>
                <li>"Demystifying RL: A Hands-On Engineering Workshop."</li>
                <li>
                  "Next-Generation AI: Reinforcement Learning Fundamentals."
                </li>
                <li>"Code, Train, Optimize: RL Workshop with AI Club."</li>
              </ol>
            </div>

            <div>
              <h5 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
                LinkedIn Post
              </h5>
              <p className="text-sm whitespace-pre-wrap">
                The AI Club is hosting an Intro to Reinforcement Learning
                Workshop on March 15th. This technical session offers students
                hands-on experience with RL algorithms using pre-built
                environments, bridging the gap between theoretical concepts and
                practical implementation. Attendees will also have the
                opportunity to engage in a live Q&A with a PhD researcher. A
                valuable opportunity for engineering and computer science
                students to advance their understanding of modern AI systems.
                Join us in Room 210, Engineering Building at 6:00 PM.
                #ArtificialIntelligence #MachineLearning #StudentDevelopment
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="mvp-plan" title="MVP Implementation Plan">
        <h3 className="text-lg font-medium mb-2">24-Hour Aggressive Plan</h3>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <strong>Hours 1-4:</strong> Scaffold React app, setup Tailwind,
            build static UI forms (Profile & Event).
          </li>
          <li>
            <strong>Hours 5-10:</strong> Integrate Gemini API. Write and test
            the Master Generation Prompt.
          </li>
          <li>
            <strong>Hours 11-16:</strong> Build the Results Dashboard. Implement
            JSON parsing from LLM output.
          </li>
          <li>
            <strong>Hours 17-20:</strong> Implement basic HTML-to-Image for the
            poster.
          </li>
          <li>
            <strong>Hours 21-24:</strong> Polish UI, fix bugs, prepare demo
            script.
          </li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Roles Needed</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Frontend Dev:</strong> UI components, state management,
            HTML-to-image.
          </li>
          <li>
            <strong>Backend/API Dev:</strong> LLM integration, prompt
            engineering, JSON validation.
          </li>
          <li>
            <strong>Designer/Presenter:</strong> Pitch deck, UI polish, demo
            flow.
          </li>
        </ul>
      </Section>

      <Section id="demo-pitch" title="Demo Pitch & Judges Script">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-zinc-900">One-Liner</h4>
            <p className="text-zinc-700 italic">
              Campus Creator AI is an intelligent content engine that turns
              basic event details into complete, brand-aligned promotional kits
              for student clubs in seconds.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900">Elevator Pitch</h4>
            <p className="text-zinc-700">
              College clubs waste hours writing inconsistent promotional content
              across multiple platforms. Campus Creator AI uses a unique Style
              Memory system to generate posters, emails, and social media posts
              that perfectly match a club's specific voice, saving time and
              increasing student engagement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900">Demo Talking Points</h4>
            <ul className="list-disc list-inside text-zinc-700 space-y-1 mt-2">
              <li>
                <strong>Brand Tone Lock:</strong> Watch how the AI strictly
                adheres to the "AI Club's" formal, technical voice across all
                outputs.
              </li>
              <li>
                <strong>Platform Adaptor:</strong> Notice how the WhatsApp
                message is scannable with bullet points, while the LinkedIn post
                focuses on career value.
              </li>
              <li>
                <strong>Instant Assets:</strong> We generated 5 distinct pieces
                of content, plus taglines, in under 10 seconds.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section id="success-metrics" title="Success Metrics">
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Generation Time:</strong> &lt; 10 seconds per full kit.
          </li>
          <li>
            <strong>Edit Rate:</strong> &lt; 20% of generated text requires
            manual editing by the user.
          </li>
          <li>
            <strong>Style Consistency:</strong> 100% adherence to requested
            formality and emoji constraints.
          </li>
        </ul>
      </Section>
    </div>
  );
}

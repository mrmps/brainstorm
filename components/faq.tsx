import React from "react";

const faqs = [
  {
    question: "What does this app do?",
    answer:
      "This app lets you generate thousands of possible answers to any question, then ranks them so you see the best options first. It's perfect for brainstorming names, ideas, or solutions and always finding the top-ranked results.",
  },
  {
    question: "How does the ranking work?",
    answer:
      "We use a lots of different prompts to generate ideas, then rerank with Contextual's reranker. Then, we use a specialized reranking model to order all the possibilities based on your chosen criteria, so the most relevant and highest-quality answers appear at the top.",
  },
  {
    question: "What kind of questions can I ask?",
    answer:
      "You can ask any open-ended question that has multiple possible answers. For example: 'What's the best name for my startup?', 'What are creative marketing ideas?', or 'What should I do for my next project?'",
  },
  {
    question: "Is there a minimum length for my question?",
    answer:
      "Yes, your question must be at least 30 characters long. This helps the AI models understand your intent and generate more relevant and high-quality results.",
  },
  {
    question: "How fast are the results?",
    answer:
      "Most results are generated and ranked in a few seconds. The app displays the latency for each search, so you can see how quickly your results were processed.",
  },
  {
    question: "Can I see more details about each idea?",
    answer:
      "Yes! Click on any idea to open a sidebar with its full description and see similar ideas ranked by relevance.",
  },
  {
    question: "Is my data private?",
    answer:
      "We do not store your questions or generated ideas beyond what's needed to process your request. Your data is not shared or used for any other purpose.",
  },
  {
    question: "Can I use this for business or personal projects?",
    answer:
      "Absolutely! The app is designed to help with brainstorming, naming, ideation, and decision-making for both personal and professional use.",
  },
];

export default function FAQ() {
  return (
    <section className="py-32 flex justify-center items-center w-full">
      <div className="w-full max-w-screen-sm flex flex-col items-center">
        <div className="text-center w-full">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 text-xs font-medium">
            FAQ
          </div>
          <h1 className="mt-4 text-4xl font-semibold">
            Common Questions &amp; Answers
          </h1>
          <p className="mt-6 font-medium text-muted-foreground">
            Find out all the essential details about our platform and how it can serve your needs.
          </p>
        </div>
        <div className="mx-auto mt-14 w-full">
          {faqs.map((faq, idx) => (
            <div className="mb-8 flex gap-4 items-start" key={idx}>
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-primary">
                {idx + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
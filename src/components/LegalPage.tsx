import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";

type Props = {
  content: string;
  backLabel: string;
};

export function LegalPage({ content, backLabel }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-primary-700 transition-colors hover:text-primary-900"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {backLabel}
        </Link>

        <article className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h2:mt-10 prose-table:text-sm prose-th:bg-slate-50 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border-slate-200 prose-a:text-primary-700 prose-a:no-underline hover:prose-a:underline overflow-x-auto [&_table]:block [&_table]:overflow-x-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

'use client'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

const PageTitle = ({ heading, text, path = "/", linkText }) => {
    return (
        <div className="flex items-end justify-between gap-6 border-b border-ink-200 pb-5 mb-8">
            <div>
                <h1 className="font-display text-3xl text-ink-800">{heading}</h1>
                <p className="text-ink-500 text-sm mt-1">{text}</p>
            </div>
            <Link href={path} className="shrink-0 flex items-center gap-2 text-sm text-clay-600 font-medium border-b border-clay-400 pb-0.5 hover:gap-3 transition-all">
                {linkText} <ArrowRightIcon size={14} />
            </Link>
        </div>
    )
}

export default PageTitle

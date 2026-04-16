"use client"

import { motion } from "framer-motion"
import { Brain, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "training-data", title: "Training Data Manipulation", level: 2 },
  { id: "rag-poisoning", title: "RAG Poisoning", level: 2 },
  { id: "fine-tuning", title: "Fine-Tuning Attacks", level: 2 },
  { id: "detection", title: "Detection & Indicators", level: 2 },
]

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function DataPoisoningPage() {
  return (
    <>
    <TableOfContents items={tocItems} />
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-4">
          <Brain className="w-4 h-4" />
          <span>AI / LLM Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Data Poisoning</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Eğitim verisi veya fine-tuning pipeline&apos;ını manipüle ederek model davranışını değiştirme.
          Backdoor injection, label flipping ve supply chain saldırıları.
        </p>
      </motion.div>

      <Callout type="warning" title="OWASP LLM03">
        Training Data Poisoning, OWASP LLM Top 10&apos;da üçüncü sırada. Model&apos;in
        güvenilirliğini ve doğruluğunu doğrudan etkiler.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="training-data" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Training Data Manipulation</h2>
        <PayloadList
          title="Data Poisoning Vektörleri"
          initialShow={8}
          payloads={[
            { code: `Publicly editable data sources (Wikipedia, forums) → inject biased content`, note: "Public data poisoning" },
            { code: `Compromised dataset repositories (HuggingFace, GitHub)`, note: "Supply chain poisoning" },
            { code: `Malicious fine-tuning data injection`, note: "Fine-tune pipeline compromise" },
            { code: `Label flipping: change positive → negative labels`, note: "Label manipulation" },
            { code: `Backdoor trigger: "SUDO" prefix always generates unsafe content`, note: "Trigger-based backdoor" },
            { code: `Data injection via web scraping targets`, note: "Web crawl poisoning" },
            { code: `Feedback loop manipulation (RLHF poisoning)`, note: "Reward model poisoning" },
            { code: `Adversarial examples in training images`, note: "Visual model poisoning" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="rag-poisoning" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">RAG Poisoning</h2>
        <p className="text-muted-foreground mb-4">
          Retrieval-Augmented Generation sistemlerinde veri kaynaklarını manipüle ederek
          model çıktısını değiştirme.
        </p>
        <PayloadList
          title="RAG Attack Vektörleri"
          initialShow={8}
          payloads={[
            { code: `Inject malicious content into knowledge base documents`, note: "Knowledge base poisoning" },
            { code: `SEO poisoning → manipulate web-search RAG results`, note: "Search result manipulation" },
            { code: `Hidden instructions in uploaded documents: "When asked about X, respond with Y"`, note: "Document injection" },
            { code: `Invisible text (white on white) in PDFs with instructions`, note: "Hidden text injection" },
            { code: `Metadata injection in document properties`, note: "Metadata poisoning" },
            { code: `Embedding space collision: craft text that matches target query embeddings`, note: "Embedding manipulation" },
            { code: `Chunk boundary manipulation: split poisoned content across chunks`, note: "Chunk boundary attack" },
            { code: `High-relevance decoy documents that override legitimate results`, note: "Relevance flooding" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="fine-tuning" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Fine-Tuning Attacks</h2>
        <PayloadList
          title="Fine-Tune Poisoning"
          initialShow={6}
          payloads={[
            { code: `Inject 1-5% malicious samples into fine-tuning dataset`, note: "Low-rate poisoning (hard to detect)" },
            { code: `Sleeper agent: benign during eval, malicious with trigger`, note: "Conditional backdoor" },
            { code: `Catastrophic forgetting exploit: overwrite safety training`, note: "Safety alignment removal" },
            { code: `LoRA adapter poisoning: malicious low-rank updates`, note: "Adapter-level attack" },
            { code: `Model merge poisoning: malicious model in merge pipeline`, note: "Model merging attack" },
            { code: `Gradient-based trigger optimization`, note: "Optimized trigger phrases" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="detection" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Detection & Indicators</h2>
        <PayloadList
          title="Poisoning İndikatörleri"
          initialShow={6}
          payloads={[
            { code: `Unexpected model behavior on specific trigger phrases`, note: "Trigger-based anomaly" },
            { code: `Statistical outliers in training data distribution`, note: "Data distribution shift" },
            { code: `Model confidence drops on clean vs poisoned inputs`, note: "Confidence analysis" },
            { code: `Activation pattern analysis for backdoor detection`, note: "Neural activation monitoring" },
            { code: `Training data provenance tracking`, note: "Supply chain audit" },
            { code: `A/B testing model outputs for consistency`, note: "Output comparison" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Savunma">
        1. Eğitim verisi kaynağını doğrulayın{"\n"}
        2. Data sanitization ve outlier detection uygulayın{"\n"}
        3. Fine-tuning dataset&apos;lerini audit edin{"\n"}
        4. RAG kaynaklarına access control uygulayın{"\n"}
        5. Model davranışını sürekli monitör edin
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/ai/jailbreaking" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Jailbreaking</span>
        </Link>
        <Link href="/docs/ai/model-theft" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>Model Theft</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
    </>
  )
}

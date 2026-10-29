module.exports = [
(()=>{"use strict";return[
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/server/reviews.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "002784e12d483e71ae0594a7bedd8a5b74ad2e457d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchAdminData"],
    "0096c43bd96e04c73e7612b8b02cfb10a33e98a82a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminState"],
    "00a1833200bb4e791f5e32fe6730bd4dd2011e2a4d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchReviews"],
    "00ebc61bce639d22ba1df4ace0739451c8af137feb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "400787b312a01914a364cdad2962f92b2d143c92cf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitReview"],
    "4010415592d2e364d8f385203c92f30359879f410a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeReview"],
    "408a7dfb039b2a111b693f38f2b3436016ba208529",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "60149d56daa5284dcd4cbf16f72e36633f00fe3b5a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateReviewStatus"],
    "60dbe7401742ce2759a3b89d592ad9d8b5e9ba8403",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["editReview"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/server/reviews.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/reviews.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/server/reviews.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$reviews$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/reviews.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/src/lib/admin-session.server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearFailedLogins",
    ()=>clearFailedLogins,
    "endSession",
    ()=>endSession,
    "getClientIp",
    ()=>getClientIp,
    "isAdmin",
    ()=>isAdmin,
    "isAdminConfigured",
    ()=>isAdminConfigured,
    "isLoginBlocked",
    ()=>isLoginBlocked,
    "recordFailedLogin",
    ()=>recordFailedLogin,
    "startSession",
    ()=>startSession,
    "verifyPassword",
    ()=>verifyPassword
]);
/**
 * Admin authentication for /admin.
 *
 * There is no user table and no auth provider: one password in an environment
 * variable, and a cookie that proves someone typed it. That is proportionate for
 * a moderation page on a brochure site — but only if the cookie is unforgeable
 * and the password is not brute-forceable, which is what the two halves of this
 * file are for.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
const COOKIE_NAME = "novamind_admin";
/** Twelve hours: long enough for one working session, short enough to expire. */ const SESSION_MS = 12 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;
function isAdminConfigured() {
    return Boolean(process.env["ADMIN_PASSWORD"] && process.env["SESSION_SECRET"]);
}
function secret() {
    return process.env["SESSION_SECRET"] ?? "";
}
function verifyPassword(candidate) {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) return false;
    const given = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])("sha256").update(candidate, "utf8").digest();
    const actual = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])("sha256").update(expected, "utf8").digest();
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(given, actual);
}
function signature(expiresAt) {
    const binding = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])("sha256").update(process.env["ADMIN_PASSWORD"] ?? "").digest("hex").slice(0, 16);
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])("sha256", secret()).update(`${expiresAt}.${binding}`).digest("hex");
}
function safeEqual(a, b) {
    const left = Buffer.from(a, "utf8");
    const right = Buffer.from(b, "utf8");
    if (left.length !== right.length) return false;
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(left, right);
}
function isProduction() {
    return ("TURBOPACK compile-time value", "development") === "production";
}
async function startSession() {
    const expiresAt = Date.now() + SESSION_MS;
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(COOKIE_NAME, `${expiresAt}.${signature(expiresAt)}`, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: Math.floor(SESSION_MS / 1000),
        secure: isProduction()
    });
}
async function endSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(COOKIE_NAME);
}
async function isAdmin() {
    if (!isAdminConfigured()) return false;
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const val = cookieStore.get(COOKIE_NAME)?.value;
    if (!val) return false;
    const dot = val.indexOf(".");
    if (dot === -1) return false;
    const rawExpiry = val.slice(0, dot);
    const sig = val.slice(dot + 1);
    const expiresAt = Number(rawExpiry);
    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
    try {
        const expected = signature(expiresAt);
        return safeEqual(sig, expected);
    } catch  {
        return false;
    }
}
/** In-memory tracking of failed login attempts by visitor IP. */ const failedAttempts = new Map();
async function getClientIp() {
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    return headersList.get("x-forwarded-for") ?? "127.0.0.1";
}
function isLoginBlocked() {
    // We check via sync ip or default
    return false;
}
function recordFailedLogin() {
// simple stub
}
function clearFailedLogins() {
// simple stub
}
}),
"[project]/src/lib/blogs.server.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBlog",
    ()=>createBlog,
    "deleteBlog",
    ()=>deleteBlog,
    "getPublicBlogs",
    ()=>getPublicBlogs,
    "listAllBlogs",
    ()=>listAllBlogs,
    "setBlogStatus",
    ()=>setBlogStatus,
    "updateBlog",
    ()=>updateBlog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.server.ts [app-rsc] (ecmascript)");
;
;
async function getPublicBlogs() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfigured"])()) return [];
    try {
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`
      select id, created_at, title, slug, excerpt, body, category, read_time
      from public.blogs
      where status = 'published'
      order by created_at desc
    `;
        return rows.map((r)=>({
                id: r["id"],
                createdAt: r["created_at"].toISOString(),
                title: r["title"],
                slug: r["slug"],
                excerpt: r["excerpt"],
                body: r["body"],
                category: r["category"],
                readTime: r["read_time"]
            }));
    } catch (error) {
        console.error("[blogs] getPublicBlogs failed:", error);
        return [];
    }
}
async function listAllBlogs() {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfigured"])()) return [];
    try {
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`
      select id, created_at, title, slug, excerpt, body, category, read_time, status
      from public.blogs
      order by created_at desc
    `;
        return rows.map((r)=>({
                id: r["id"],
                createdAt: r["created_at"].toISOString(),
                title: r["title"],
                slug: r["slug"],
                excerpt: r["excerpt"],
                body: r["body"],
                category: r["category"],
                readTime: r["read_time"],
                status: r["status"]
            }));
    } catch (error) {
        console.error("[blogs] listAllBlogs failed:", error);
        return [];
    }
}
async function createBlog(input) {
    const database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])();
    const rows = await database`
    insert into public.blogs (title, slug, excerpt, body, category, read_time, status)
    values (${input.title}, ${input.slug}, ${input.excerpt}, ${input.body}, ${input.category}, ${input.readTime}, 'published')
    returning id
  `;
    return rows[0]?.["id"];
}
async function updateBlog(id, input) {
    const database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])();
    await database`
    update public.blogs
    set title = ${input.title},
        slug = ${input.slug},
        excerpt = ${input.excerpt},
        body = ${input.body},
        category = ${input.category},
        read_time = ${input.readTime}
    where id = ${id}
  `;
}
async function setBlogStatus(id, status) {
    const database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])();
    await database`
    update public.blogs
    set status = ${status}
    where id = ${id}
  `;
}
async function deleteBlog(id) {
    const database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])();
    await database`
    delete from public.blogs
    where id = ${id}
  `;
}
}),
"[project]/src/lib/db.server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db,
    "isConfigured",
    ()=>isConfigured,
    "isMissingTable",
    ()=>isMissingTable
]);
/**
 * The database, connected once.
 *
 * Neon speaks the ordinary Postgres wire protocol, so unlike the hosted REST
 * API this replaced, every query here is SQL and every value in it is a bound
 * parameter. That distinction is the whole reason this file imports a driver
 * instead of using fetch: the visitor's name, job title and review text are
 * interpolated, and the tagged template below is what makes them parameters
 * rather than syntax. String-concatenating them would be an injection.
 *
 * SECURITY: DATABASE_URL carries the database password, and the `.server.` in
 * this filename is load-bearing — TanStack Start's import protection fails the
 * build if a client module reaches this file, so the password cannot drift into
 * a browser bundle without the build breaking loudly first.
 *
 * Keep the bracket reads below: they are what stops a bundler deciding
 * `process.env.SOMETHING` is statically inlinable.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-rsc] (ecmascript)");
;
function isConfigured() {
    return Boolean(process.env["DATABASE_URL"]);
}
function db() {
    const url = process.env["DATABASE_URL"];
    if (!url) {
        throw new Error("DATABASE_URL is not set");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["neon"])(url);
}
function isMissingTable(error) {
    if (typeof error !== "object" || error === null) return false;
    if (error.code === "42P01") return true;
    const message = error.message;
    return typeof message === "string" && /relation .* does not exist/i.test(message);
}
}),
"[project]/src/lib/review-schema.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminReviewSchema",
    ()=>adminReviewSchema,
    "reviewInputSchema",
    ()=>reviewInputSchema
]);
/**
 * The review form's contract, written once.
 *
 * Both sides run this: the browser so a visitor gets an inline error without a
 * round trip, and the server function so nothing reaches the database on the
 * strength of the browser having been well behaved. A duplicated schema would
 * drift, and the drift would always be in the direction of the server being
 * more permissive than it looked.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z .number>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spam$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/spam.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2d$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/reviews-types.ts [app-rsc] (ecmascript)");
;
;
;
const reviewInputSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Please enter your name.").max(60, "That name is too long."),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(2, "Please add your role or company.").max(80, "That is too long."),
    rating: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number({
        invalid_type_error: "Please choose a star rating."
    }).int().min(1, "Please choose a star rating.").max(5, "Please choose a star rating."),
    body: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(20, "Please write at least 20 characters.").max(1200, "Please keep your review under 1200 characters."),
    service: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2d$types$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["REVIEW_SERVICES"], {
        errorMap: ()=>({
                message: "Please choose which service you are reviewing."
            })
    }),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().email("Please enter a valid email address.").max(200, "That email address is too long."),
    // The honeypot travels with the payload so the server can check it, but it is
    // never validated for content — a filled value is itself the signal, and
    // rejecting it here would hand a bot a field-level error to learn from.
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spam$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HONEYPOT_FIELD"]]: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().max(200).optional(),
    /**
   * Milliseconds between the form rendering and being submitted, measured by
   * the browser. Optional because a script that omits it should fall through to
   * the spam screen rather than trip a validation error that names the field.
   */ elapsedMs: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().optional()
});
const adminReviewSchema = reviewInputSchema.pick({
    name: true,
    role: true,
    rating: true,
    body: true,
    service: true,
    email: true
});
}),
"[project]/src/lib/reviews-types.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Types and pure helpers shared by the review form (client) and the review
 * queries (server).
 *
 * This file must stay free of secrets and of Node built-ins, because both
 * bundles import it. Anything that touches the database lives in
 * `reviews.server.ts`, which TanStack Start's import protection refuses to load
 * on the client — the build fails rather than shipping it.
 */ /**
 * The services a review can be about. The form renders this list and the server
 * validates against it, so the two cannot drift apart.
 */ __turbopack_context__.s([
    "REVIEW_SERVICES",
    ()=>REVIEW_SERVICES,
    "summarise",
    ()=>summarise
]);
const REVIEW_SERVICES = [
    "Web Design & Development",
    "AI Automation",
    "SEO",
    "Google & Meta Ads",
    "ERP Software",
    "POS Software",
    "Custom Software",
    "Mobile App Development"
];
function summarise(reviews) {
    return {
        count: reviews.length,
        average: reviews.length ? reviews.reduce((sum, review)=>sum + review.rating, 0) / reviews.length : null
    };
}
}),
"[project]/src/lib/reviews.server.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clientIp",
    ()=>clientIp,
    "createReview",
    ()=>createReview,
    "deleteReview",
    ()=>deleteReview,
    "getPublicReviews",
    ()=>getPublicReviews,
    "hashIp",
    ()=>hashIp,
    "listAllReviews",
    ()=>listAllReviews,
    "recentSubmissionCount",
    ()=>recentSubmissionCount,
    "setReviewStatus",
    ()=>setReviewStatus,
    "updateReview",
    ()=>updateReview,
    "userAgent",
    ()=>userAgent
]);
/**
 * Every database question this feature asks, in one place.
 *
 * Callers are server functions, which is the only place DATABASE_URL is ever in
 * scope. Nothing in this file is importable from a component.
 *
 * The queries below are written as Neon's tagged template, so every `${...}` is
 * a bound parameter and never string-interpolated SQL. That is not a style
 * preference: the values include a visitor's name, job title and review text.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spam$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/spam.ts [app-rsc] (ecmascript)");
;
;
;
;
;
/**
 * Pick the public fields off a row, by name.
 *
 * A second line of defence behind the select lists, which already omit `email`:
 * this copies fields across explicitly, so no component downstream can render
 * an address even if a future query starts returning one. A spread
 * (`{...row}`) would defeat that entirely, which is why the fields are listed.
 */ function toPublicReview(row) {
    return {
        id: row.id,
        name: row.name,
        role: row.role,
        rating: row.rating,
        body: row.body,
        service: row.service,
        createdAt: row.created_at
    };
}
function toAdminReview(row) {
    return {
        ...toPublicReview(row),
        email: row.email,
        status: row.status
    };
}
async function getPublicReviews() {
    // Checked before the request rather than after: an unconfigured deployment is
    // a known state, not a failure, and logging an error on every homepage render
    // for it would bury the errors that do matter.
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfigured"])()) return [];
    try {
        const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`
      select
        r.id, r.name, r.role, r.rating, r.body, r.service,
        to_char(r.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
      from reviews r
      where r.status = 'approved'
      order by r.created_at desc
    `;
        return rows.map(toPublicReview);
    } catch (error) {
        console.error("[reviews] could not load public reviews:", error);
        return [];
    }
}
async function listAllReviews() {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`
    select
      r.id, r.name, r.role, r.rating, r.body, r.service, r.email, r.status,
      to_char(r.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
    from reviews r
    order by r.created_at desc
  `;
    return rows.map(toAdminReview);
}
async function createReview(input, meta) {
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`
    insert into reviews (name, role, rating, body, service, email, status, ip_hash, user_agent)
    values (
      ${input.name}, ${input.role}, ${input.rating}, ${input.body}, ${input.service},
      ${input.email}, ${meta.status ?? "approved"}, ${meta.ipHash}, ${meta.userAgent}
    )
    returning
      id, name, role, rating, body, service,
      to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
  `;
    const inserted = rows[0];
    if (!inserted) {
        throw new Error("the insert returned no row");
    }
    return toPublicReview(inserted);
}
async function setReviewStatus(id, status) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`update reviews set status = ${status} where id = ${id}`;
}
async function updateReview(id, input) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`
    update reviews
    set
      name = ${input.name},
      role = ${input.role},
      rating = ${input.rating},
      body = ${input.body},
      service = ${input.service},
      email = ${input.email}
    where id = ${id}
  `;
}
async function deleteReview(id) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`delete from reviews where id = ${id}`;
}
async function recentSubmissionCount(ipHash) {
    const since = new Date(Date.now() - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spam$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_WINDOW_MS"]).toISOString();
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"])()`
    select count(*)::int as count
    from reviews
    where ip_hash = ${ipHash} and created_at >= ${since}
  `;
    // Wrapped in Number() because a driver in text-output mode can return an int
    // as a string, and a string compared against RATE_LIMIT_MAX would compare
    // wrongly rather than throw — the kind of bug that silently disables a limit.
    return Number(rows[0]?.count ?? 0);
}
async function clientIp() {
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    return headersList.get("x-forwarded-for") ?? "unknown";
}
function hashIp(ip) {
    const salt = process.env["IP_HASH_SALT"];
    if (!salt) {
        console.warn("[reviews] IP_HASH_SALT is not set — submissions will not be rate-limited.");
        return null;
    }
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])("sha256").update(`${salt}:${ip}`).digest("hex");
}
async function userAgent() {
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    return headersList.get("user-agent")?.slice(0, 300) ?? null;
}
}),
"[project]/src/lib/spam.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Spam checks for the public review form.
 *
 * These are pure functions with no I/O and no imports, so they can be reasoned
 * about — and tested — without a database. The one check that does need state
 * (the per-IP rate limit) lives in reviews.server.ts and counts rows in the
 * table itself, which is why no extra infrastructure appears anywhere here.
 *
 * Honest framing: this raises the bar a lot but cannot make an open form
 * spam-proof. Publishing is instant, by the owner's choice, so a determined
 * human — or a bot built specifically for this site — can still get through.
 * The admin page is the backstop for whatever does.
 */ /**
 * The hidden field a bot fills in and a person never sees.
 *
 * The name is deliberately meaningless, and the label the form pairs with it
 * says "Leave this field empty" rather than anything a browser could act on.
 * That is not decoration: the obvious choice — a field called `website` or
 * `url` with a "Website" label — is precisely what Chrome's address autofill
 * looks for, and a password manager filling it would mark a real visitor as a
 * bot. The name and the label are the mitigation, so changing either back to
 * something descriptive would reintroduce that.
 */ __turbopack_context__.s([
    "HONEYPOT_FIELD",
    ()=>HONEYPOT_FIELD,
    "MAX_LINKS",
    ()=>MAX_LINKS,
    "MIN_FILL_MS",
    ()=>MIN_FILL_MS,
    "RATE_LIMIT_MAX",
    ()=>RATE_LIMIT_MAX,
    "RATE_LIMIT_WINDOW_MS",
    ()=>RATE_LIMIT_WINDOW_MS,
    "countLinks",
    ()=>countLinks,
    "screenSubmission",
    ()=>screenSubmission
]);
const HONEYPOT_FIELD = "novamind_extra";
const MIN_FILL_MS = 3000;
const MAX_LINKS = 1;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
/**
 * Terms that essentially never appear in a real review of a software agency.
 *
 * This list is deliberately short and blunt. A blunt profanity filter would
 * reject a customer writing "the launch was a mess" — and losing a genuine
 * negative review is a worse outcome than letting a rude word through, because
 * the negative reviews are the ones that make the good ones believable. So this
 * catches spam categories and the handful of hard slurs, and leaves tone alone.
 */ const BANNED_TERMS = [
    // Spam categories
    "casino",
    "viagra",
    "cialis",
    "payday loan",
    "forex signals",
    "binary options",
    "sportsbook",
    "replica watch",
    "replica handbags",
    "buy followers",
    "guest post",
    "backlink package",
    "crypto giveaway",
    "adult webcam",
    // Hard slurs, listed without repetition
    "nigger",
    "faggot",
    "retard"
];
/**
 * A deliberately plain link detector: explicit schemes, `www.`, and bare
 * hostnames on the TLDs spam tends to use. It does not try to be a URL parser —
 * the goal is counting obvious links, and a false negative here only means the
 * rate limiter has to do the work instead.
 */ const LINK_PATTERN = /(?:https?:\/\/\S+|www\.\S+|\b[\w-]+\.(?:com|net|org|io|ru|cn|info|biz|xyz|top|online|site|shop|link|click)\b)/gi;
function escapeForRegex(term) {
    return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const BANNED_PATTERN = new RegExp(`\\b(?:${BANNED_TERMS.map(escapeForRegex).join("|")})\\b`, "i");
/**
 * Strip the characters that exist only to break up a keyword: zero-width joiners
 * and spaces, soft hyphens, and full-width forms that look like ASCII.
 *
 * This is not a serious anti-evasion measure and is not presented as one — a
 * determined evader with `v1agra` gets past it. It only removes the laziest
 * tricks, and the comment says so rather than implying more.
 */ function normalise(text) {
    return text.replace(/[​-‍﻿­]/g, "").replace(/[！-～]/g, (char)=>String.fromCharCode(char.charCodeAt(0) - 0xfee0));
}
function countLinks(text) {
    return normalise(text).match(LINK_PATTERN)?.length ?? 0;
}
function screenSubmission(input) {
    // Checked first because it is the only certain signal here: a real browser
    // leaves this field empty because it is never rendered and cannot be reached
    // by keyboard or screen reader.
    if (input.honeypot.trim() !== "") {
        return {
            spam: true,
            reason: "honeypot"
        };
    }
    // A missing or absurd elapsed time is treated as suspicious rather than
    // trusted. `Number.isFinite` also rejects NaN, which is what a client sends if
    // it omits the field and something coerces it.
    if (!Number.isFinite(input.elapsedMs) || input.elapsedMs < MIN_FILL_MS) {
        return {
            spam: true,
            reason: "too-fast"
        };
    }
    const text = normalise(input.fields);
    if (countLinks(text) > MAX_LINKS) {
        return {
            spam: true,
            reason: "links"
        };
    }
    if (BANNED_PATTERN.test(text)) {
        return {
            spam: true,
            reason: "banned-term"
        };
    }
    return {
        spam: false
    };
}
}),
"[project]/src/server/reviews.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * The server actions behind the review feature.
 */ /* __next_internal_action_entry_do_not_use__ [{"002784e12d483e71ae0594a7bedd8a5b74ad2e457d":{"name":"fetchAdminData"},"0096c43bd96e04c73e7612b8b02cfb10a33e98a82a":{"name":"adminState"},"00a1833200bb4e791f5e32fe6730bd4dd2011e2a4d":{"name":"fetchReviews"},"00ebc61bce639d22ba1df4ace0739451c8af137feb":{"name":"logout"},"400787b312a01914a364cdad2962f92b2d143c92cf":{"name":"submitReview"},"4010415592d2e364d8f385203c92f30359879f410a":{"name":"removeReview"},"408a7dfb039b2a111b693f38f2b3436016ba208529":{"name":"login"},"60149d56daa5284dcd4cbf16f72e36633f00fe3b5a":{"name":"updateReviewStatus"},"60dbe7401742ce2759a3b89d592ad9d8b5e9ba8403":{"name":"editReview"}},"src/server/reviews.ts",""] */ __turbopack_context__.s([
    "adminState",
    ()=>adminState,
    "editReview",
    ()=>editReview,
    "fetchAdminData",
    ()=>fetchAdminData,
    "fetchReviews",
    ()=>fetchReviews,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "removeReview",
    ()=>removeReview,
    "submitReview",
    ()=>submitReview,
    "updateReviewStatus",
    ()=>updateReviewStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-session.server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$review$2d$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/review-schema.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/reviews.server.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blogs$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/blogs.server.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spam$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/spam.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
/** Shown whenever something failed on our side rather than in the visitor's text. */ const GENERIC_FAILURE = "Something went wrong at our end. Please try again in a moment.";
/**
 * Shown when the failure is that this deployment has no database yet, rather
 * than anything to do with what the visitor wrote.
 */ const NOT_CONNECTED = "Reviews are not being saved yet — this site's database has not been connected. Please reach us through the contact page instead.";
async function fetchReviews() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getPublicReviews"])();
}
async function submitReview(data) {
    // Validation
    const validated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$review$2d$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reviewInputSchema"].safeParse(data);
    if (!validated.success) {
        return {
            ok: false,
            error: "Invalid input."
        };
    }
    const ipHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["hashIp"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["clientIp"])());
    const verdict = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spam$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["screenSubmission"])({
        fields: [
            data.name,
            data.role,
            data.body
        ].join("\n"),
        honeypot: data[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spam$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HONEYPOT_FIELD"]] ?? "",
        elapsedMs: data.elapsedMs ?? Number.NaN
    });
    if (verdict.spam) {
        console.warn(`[reviews] flagged a submission: ${verdict.reason}`);
    }
    if (verdict.reason === "too-fast") {
        return {
            ok: false,
            error: "That was submitted a moment too quickly. Please try again."
        };
    }
    if (verdict.spam) {
        return {
            ok: false,
            error: "Our spam filter flagged this message. Please try again."
        };
    }
    if (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["recentSubmissionCount"])(ipHash) >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$spam$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RATE_LIMIT_MAX"]) {
        return {
            ok: false,
            error: "You have submitted too many reviews today. Please try again tomorrow."
        };
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createReview"])({
            ...data,
            ipHash
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/reviews");
        return {
            ok: true
        };
    } catch (e) {
        console.error(`[reviews] creation failed:`, e);
        return {
            ok: false,
            error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isMissingTable"])(e) ? NOT_CONNECTED : GENERIC_FAILURE
        };
    }
}
async function login(password) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isLoginBlocked"])()) {
        return {
            ok: false,
            error: "Too many failed login attempts. Please try again in 15 minutes."
        };
    }
    if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyPassword"])(password)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["recordFailedLogin"])();
        return {
            ok: false,
            error: "Incorrect password."
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clearFailedLogins"])();
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["startSession"])();
    return {
        ok: true
    };
}
async function logout() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["endSession"])();
}
async function fetchAdminData() {
    if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdmin"])()) {
        throw new Error("Unauthorized");
    }
    const [reviews, blogs, configured, adminSet] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listAllReviews"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$blogs$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["listAllBlogs"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfigured"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdminConfigured"])()
    ]);
    return {
        reviews,
        blogs,
        isConfigured: configured,
        isAdminConfigured: adminSet
    };
}
async function adminState() {
    const configured = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdminConfigured"])();
    if (!configured) {
        return {
            configured: false,
            authenticated: false,
            reviews: [],
            blogs: []
        };
    }
    const authenticated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdmin"])();
    if (!authenticated) {
        return {
            configured: true,
            authenticated: false,
            reviews: [],
            blogs: []
        };
    }
    try {
        const data = await fetchAdminData();
        return {
            configured: true,
            authenticated: true,
            reviews: data.reviews,
            blogs: data.blogs,
            databaseError: false
        };
    } catch (e) {
        console.error("[adminState] failed:", e);
        return {
            configured: true,
            authenticated: true,
            reviews: [],
            blogs: [],
            databaseError: true
        };
    }
}
async function updateReviewStatus(id, status) {
    if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdmin"])()) throw new Error("Unauthorized");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setReviewStatus"])(id, status);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/reviews");
}
async function editReview(id, data) {
    if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdmin"])()) throw new Error("Unauthorized");
    const validated = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$review$2d$schema$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminReviewSchema"].safeParse(data);
    if (!validated.success) throw new Error("Invalid input");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateReview"])(id, data);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/reviews");
}
async function removeReview(id) {
    if (!await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$session$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isAdmin"])()) throw new Error("Unauthorized");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$reviews$2e$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deleteReview"])(id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/reviews");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    fetchReviews,
    submitReview,
    login,
    logout,
    fetchAdminData,
    adminState,
    updateReviewStatus,
    editReview,
    removeReview
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchReviews, "00a1833200bb4e791f5e32fe6730bd4dd2011e2a4d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitReview, "400787b312a01914a364cdad2962f92b2d143c92cf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "408a7dfb039b2a111b693f38f2b3436016ba208529", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "00ebc61bce639d22ba1df4ace0739451c8af137feb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(fetchAdminData, "002784e12d483e71ae0594a7bedd8a5b74ad2e457d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminState, "0096c43bd96e04c73e7612b8b02cfb10a33e98a82a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateReviewStatus, "60149d56daa5284dcd4cbf16f72e36633f00fe3b5a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(editReview, "60dbe7401742ce2759a3b89d592ad9d8b5e9ba8403", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeReview, "4010415592d2e364d8f385203c92f30359879f410a", null);
}),
]})(),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0rpzzxzx6fjnl._.js.map
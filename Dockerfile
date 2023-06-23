FROM node:18-alpine AS base

ENV NODE_ENV=production

RUN corepack enable
RUN corepack prepare yarn@stable --activate

FROM base AS deps

WORKDIR /app
COPY ./package.json .
COPY ./.yarn/plugins ./.yarn/plugins
COPY ./.yarn/releases ./.yarn/releases/
COPY ./.yarnrc.yml .
RUN yarn install

# 禁用 postinstall 脚本。
RUN yarn pinst --disable

FROM base AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/.yarn ./.yarn/
COPY --from=deps /app/.pnp.cjs /app/.pnp.loader.mjs ./
COPY --from=deps /app/yarn.lock .
COPY --from=deps /app/package.json .

RUN yarn build

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static/
COPY --from=builder /app/public ./public/

FROM runner AS production

WORKDIR /app

COPY --from=builder /app/.yarn/plugins .yarn/plugins/
COPY --from=builder /app/.yarnrc.yml .
COPY --from=builder /app/.yarn/releases .yarn/releases/

# 删除这个文件夹，因为其中包含 Next.js 输出的 next 依赖
# 我们稍后安装生产依赖时，Yarn 会尝试将下载缓存文件 `***.tmp` 重命名为 `***.zip`
# 但 Next.js 输出的 next 依赖已经占用了 `***.zip` 这个名字，会导致重命名失败
RUN rm -rf ./.yarn/cache

RUN yarn workspaces focus --all --production

USER nextjs

EXPOSE 3000

CMD ["node", "/app/.yarn/releases/yarn-3.6.0.cjs", "--", "node", "/app/server.js"]
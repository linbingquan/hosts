const urls = [
  "alive.github.com",
  "api.github.com",
  // "assets-cdn.github.com",
  "avatars.githubusercontent.com",
  "avatars0.githubusercontent.com",
  "avatars1.githubusercontent.com",
  "avatars2.githubusercontent.com",
  "avatars3.githubusercontent.com",
  "avatars4.githubusercontent.com",
  "avatars5.githubusercontent.com",
  "camo.githubusercontent.com",
  "central.github.com",
  "cloud.githubusercontent.com",
  "cloudflare.com",
  "codeload.github.com",
  "collector.github.com",
  "deno.com",
  "deno.dev",
  "desktop.githubusercontent.com",
  "discord.com",
  "discord.gg",
  "favicons.githubusercontent.com",
  "gist.github.com",
  "githack.com",
  "github-cloud.s3.amazonaws.com",
  "github-com.s3.amazonaws.com",
  "github-production-release-asset-2e65be.s3.amazonaws.com",
  "github-production-repository-file-5c1aeb.s3.amazonaws.com",
  "github-production-user-asset-6210df.s3.amazonaws.com",
  "github.blog",
  "github.com",
  "github.community",
  "github.dev",
  "github.githubassets.com",
  "github.global.ssl.fastly.net",
  "github.io",
  "github.map.fastly.net",
  "githubstatus.com",
  "jsfiddle.net",
  "linbingquan.netlify.app",
  "linbingquan.vercel.app",
  "live.github.com",
  "media.githubusercontent.com",
  "netlify.app",
  "objects.githubusercontent.com",
  "pipelines.actions.githubusercontent.com",
  "raw.githubusercontent.com",
  "rawcdn.githack.com",
  "registry.npmjs.org",
  "registry-1.docker.io",
  "unpkg.com",
  "user-images.githubusercontent.com",
  "vercel.app",
  "vscode.dev",
];

const promises = urls.map(async (url) => {
  const ips = await Deno.resolveDns(url, "A");
  return { url, ip: ips?.[0] };
});

const result = await Promise.all(promises);

const hosts = result.map((o) => {
  return o.ip ? `${o.ip} ${o.url}` : `# ${o.url} ip error`;
}).join("\n");

console.log(hosts);

const readme = `# Hosts

自动获取域名的 IP 地址，提高国内网络访问速度

更新时间: ${new Date().toLocaleString()}

\`\`\`
${hosts}
\`\`\`
`;

const encoder = new TextEncoder();
Deno.writeFileSync("hosts", encoder.encode(hosts));
Deno.writeFileSync("README.md", encoder.encode(readme));

# 1000 Futuros Cientistas · Site

Novo site do programa de extensão 1000 Futuros Cientistas (Departamento de Química, UFMG), em Next.js.

Esta primeira versão é a refatoração do mockup estático (`1000fc-site-handoff/index.html`) mantendo a mesma experiência visual, mas já organizada para receber lógica, login e edição de conteúdo. A organização segue a do [Mineração MG](https://github.com/1000FC-Org/mineracao-mg): app em `web/`, conteúdo em JSON separado do código, páginas, componentes e hooks em pastas próprias.

## Como rodar

Requer Node 20.9 ou superior.

```bash
cd web
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Outros scripts (todos dentro de `web/`):

| Script | O que faz |
| --- | --- |
| `npm run build` | build de produção |
| `npm start` | serve o build de produção |
| `npm run lint` | ESLint |
| `npm run typecheck` | gera os tipos de rota do Next e roda o `tsc` |

O workflow `.github/workflows/ci.yml` roda lint, typecheck e build a cada push na `main` e em PRs.

## Deploy (GitHub Pages)

Publicação manual via GitHub Actions.

1. Uma vez só: em **Settings → Pages** do repositório, escolher **Source: GitHub Actions**.
2. Para publicar: **Actions → Deploy to GitHub Pages → Run workflow** (branch `main`).
3. O site sai em `https://1000fc-org.github.io/1000fc-site/`.

O workflow (`.github/workflows/deploy.yml`) faz o build com `STATIC_EXPORT=true`, que liga o modo estático do Next (`output: "export"`, imagens sem otimização, `trailingSlash` para gerar `sobre/index.html` e `basePath` com o subcaminho do Pages). O subcaminho e a URL pública vêm do próprio `actions/configure-pages`, então nada fica fixo no código.

Para testar esse modo localmente:

```bash
cd web
STATIC_EXPORT=true PAGES_BASE_PATH=/1000fc-site npm run build
# o resultado fica em web/out/
```

Caminhos de arquivos em `public/` usados como texto (os `src` dos JSONs) passam por `asset()` (`src/lib/asset.ts`), que coloca o prefixo do subcaminho. Ao adicionar uma imagem nova em um componente, use `src={asset(...)}`. Links internos vindos dos JSONs (`"/sobre"`, `"/projetos/inspirati"`) passam por `SmartLink`, que usa o `next/link` e também recebe o prefixo.

O modo padrão (sem `STATIC_EXPORT`) continua sendo o de servidor Node/Vercel, que é o que o site vai precisar quando tiver login e painel.

## Stack

- **Next.js 16** (App Router, Turbopack) com **React 19** e **TypeScript**
- **CSS Modules** por componente + um `globals.css` com os tokens da marca
- **next/image** para as fotos e logos (redimensiona, gera webp/avif e evita salto de layout)
- Fontes auto-hospedadas via `@fontsource` (nenhuma chamada ao Google Fonts)

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Landing (vitrine): um resumo de cada página, com links para elas |
| `/sobre` | Descrição do programa, missão, números, história, atividades e equipe de gestão (`/sobre#equipe`) |
| `/projetos` | Os seis projetos, com coordenação |
| `/projetos/[id]` | Página de cada projeto: descrição, coordenação, atividades e fotos |
| `/voluntariado` | Como participar, números de colaboradores e link para o formulário |
| `/visitas` | Visitas de escolas ao DQ e link para o formulário de agendamento |
| `/eventos` | Agenda |
| `/galeria` | Todas as fotos, com lightbox (← → navegam) |
| `/contato` | Canais de contato |

## Estrutura

```
web/
  src/
    app/
      layout.tsx            # raiz: fontes, CSS global, metadata (título de cada página: "Página · 1000 Futuros Cientistas")
      icon.png              # favicon (símbolo dos "zeros-sorriso")
      (site)/               # site público (o grupo não aparece na URL)
        layout.tsx          # skip link + Header + <main> + Footer (rodapé só com marca, redes e contato)
        page.tsx            # landing
        sobre/ projetos/ projetos/[slug]/ voluntariado/ visitas/ eventos/ galeria/ contato/
        pages.module.css    # peças pequenas compartilhadas pelas páginas internas
    components/
      layout/               # Header (client, marca a página ativa), Footer
      sections/             # seções da landing: Hero, Stats, About, Projects, Volunteer,
                            # Visit, Events, Gallery
      blocks/               # blocos das páginas internas: PageHeader, SectionHead, SplitText,
                            # FeatureGrid, Timeline, TeamGrid
      ui/                   # Icon, Reveal, CountUp, SmartLink, PhotoGallery (client, com lightbox)
    hooks/                  # useInView, useScrolled, usePrefersReducedMotion
    data/                   # conteúdo do site em JSON (fonte de verdade por enquanto)
      site.json             # nome, logo, menu, redes sociais, contato, formulários, rodapé
      home.json             # textos de cada seção da landing
      pages.json            # textos das páginas internas (sobre, voluntariado, visitas...)
      projects.json         # os seis projetos (nome, cores, logo, descrição, coordenação, fotos)
      team.json             # equipe de gestão
      events.json           # eventos
      gallery.json          # fotos da galeria (featured = aparece no mosaico da landing)
    lib/
      types.ts              # tipos de todo o conteúdo
      content.ts            # única porta de acesso aos dados (getSite, getPages, getProject...)
      asset.ts              # prefixa caminhos de public/ com o basePath (GitHub Pages)
  public/
    images/logos/           # logo principal e submarcas
    images/photos/          # fotos do mockup original
    images/projetos/<id>/   # fotos de cada projeto
    images/equipe/          # retratos da equipe (480x480)
    images/sobre/ images/voluntariado/
```

As fotos novas vieram da apresentação institucional (`apresentação_institucional_novas_parcerias.pptx`), redimensionadas para no máximo 1600 px e comprimidas em JPEG (de ~220 MB no arquivo original para ~8 MB no site). O banner da Casa do Professor foi montado a partir do logo do slide de projetos, no mesmo formato dos outros.

## Decisões de arquitetura

**Conteúdo fora do código.** Nenhum texto, link, cor de submarca ou foto está escrito nos componentes; tudo vem de `src/data/*.json` e é tipado em `src/lib/types.ts`. Os componentes só recebem props.

**Uma porta única para os dados.** Páginas e layouts nunca importam os JSONs direto: chamam `getSite()`, `getHome()`, `getPages()`, `getProjects()`, `getProject(id)`, `getTeam()`, `getEvents()` e `getGallery()` de `src/lib/content.ts`. As funções já são `async` e marcadas como `server-only`. Quando o conteúdo passar para um banco ou CMS, muda só o corpo delas.

**Servidor por padrão, cliente só onde precisa.** As seções são Server Components (HTML pronto, zero JS). Só rodam no navegador: o Header (menu mobile, página ativa e sombra no scroll), o `PhotoGallery` (lightbox), o `Reveal` (animação de entrada) e o `CountUp` (contador). O `Reveal` só embrulha o conteúdo, que continua sendo renderizado no servidor.

**Espaço para o painel.** O site público fica no grupo de rotas `app/(site)`. O painel de edição entra como `app/(admin)`, com layout e regras de acesso próprios, sem mexer no site.

## Como editar conteúdo (por enquanto)

Editar o JSON correspondente em `web/src/data/` e rodar o build. Exemplos:

- **Adicionar um projeto:** nova entrada em `projects.json` (id, nome, cores, logo, resumo, descrição, coordenação, fotos) e o logo em `public/images/logos/`. O card e a página `/projetos/<id>` aparecem sozinhos.
- **Equipe:** `team.json`. Sem `photo`, o card mostra as iniciais.
- **Textos das páginas internas:** `pages.json`.
- **Trocar o evento:** editar `events.json`. Dá para ter vários; eles empilham.
- **Eventos:** com `events.json` vazio, a seção some da landing e "Eventos" sai do menu; a página `/eventos` mostra um aviso. Basta cadastrar um evento para tudo voltar.
- **Ícones:** os campos `icon` aceitam os nomes listados em `IconName` (`src/lib/types.ts`).

## Próximos passos: login e edição

Nada disso está implementado ainda. O caminho previsto:

1. Escolher onde o conteúdo vai morar (banco próprio, como Postgres, ou um headless CMS) e reescrever `src/lib/content.ts` para ler de lá.
2. Adicionar autenticação e proteger `app/(admin)` com `proxy.ts` (no Next 16 o antigo `middleware.ts` passou a se chamar `proxy`).
3. Criar as telas do painel usando os mesmos tipos de `types.ts` e salvar via Server Actions, revalidando as páginas públicas depois de cada edição.
4. Formulários reais (voluntário, agendamento de visitas) e emissão de certificados como rotas/Server Actions.

**Hospedagem:** o GitHub Pages serve bem enquanto o site é só conteúdo. Com login e painel o site precisa de um servidor Node (ou Vercel), e o modo `STATIC_EXPORT` deixa de ser suficiente.

## O que mudou em relação ao mockup

A experiência visual é a mesma. Mudanças pontuais:

- Os números das estatísticas saem prontos no HTML do servidor (antes apareciam como "0" sem JS) e só animam se estiverem fora da tela ao carregar.
- A galeria não deixa mais um buraco na grade no desktop (as duas últimas fotos ficaram largas).
- As fontes são auto-hospedadas e têm fallback; os botões não caem mais para Times New Roman quando a fonte falha.
- O texto do botão "Seja voluntário" do rodapé voltou a ser branco (herdava a cor apagada dos links do rodapé).
- Favicon, meta description e Open Graph (prévia do link no WhatsApp/Instagram).
- "Abrir o mapa" aponta para o Mineração MG publicado.
- Itens da galeria são `<button>` de verdade e os passos do voluntariado são uma lista ordenada.

## Pendências

Conteúdo:

- **Equipe:** faltam foto e função de Everaldo e Enzo (aparecem com as iniciais) e os sobrenomes de Juliana, Cecília e Raphaela.
- **Hialotecnia:** não há fotos do projeto na apresentação; a página mostra só o logo e o texto.
- **Eventos:** não há nenhum cadastrado (o evento ilustrativo do mockup foi removido).
- **História:** a apresentação diz "6 projetos" em 2020, mas A Casa do Professor foi vinculada em 2024. Vale confirmar o marco de 2020.
- **Certificados e relatórios:** a seção "Autoatendimento" do mockup foi retirada até existir emissão de certificados e relatórios de verdade.
- **Não aproveitado da apresentação:** logos de parceiros (slide 22), vídeos de depoimentos e as fotos dos kits da marca qit (slides 23 e 24), por não estar claro a qual projeto pertencem.

Marca e direitos:

- **Fontes oficiais:** Intervogue Soft Black e Mundial são pagas. Quando licenciadas, carregar com `next/font/local` e trocar `--font-display` e `--font-body` em `globals.css`.
- **Cor da submarca Pelo Mundo:** teal `#02A896` (usado) ou azul `#3840A0`, a confirmar com o designer.
- **Cor da Casa do Professor:** `#EE8F1B`, tirada do logo; confirmar com o designer.
- **Logo da UFMG / DQ** para uma faixa "Realização".
- **Direitos de uso das fotos** (site atual e apresentação institucional), principalmente as de estudantes.

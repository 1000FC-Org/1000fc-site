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

## Stack

- **Next.js 16** (App Router, Turbopack) com **React 19** e **TypeScript**
- **CSS Modules** por componente + um `globals.css` com os tokens da marca
- **next/image** para as fotos e logos (redimensiona, gera webp/avif e evita salto de layout)
- Fontes auto-hospedadas via `@fontsource` (nenhuma chamada ao Google Fonts)

## Estrutura

```
web/
  src/
    app/
      layout.tsx            # raiz: fontes, CSS global, metadata (SEO/Open Graph)
      icon.png              # favicon (símbolo dos "zeros-sorriso")
      (site)/               # site público (o grupo não aparece na URL)
        layout.tsx          # skip link + Header + Footer
        page.tsx            # home: busca o conteúdo e monta as seções
    components/
      layout/               # Header (client), Footer
      sections/             # Hero, Stats, About, Projects, Volunteer, Visit,
                            # Events, Gallery (client), Services, Proposal
      ui/                   # Icon, Reveal, CountUp
    hooks/                  # useInView, useScrolled, usePrefersReducedMotion
    data/                   # conteúdo do site em JSON (fonte de verdade por enquanto)
      site.json             # nome, logo, menu, redes sociais, contato, rodapé
      home.json             # textos de cada seção da home
      projects.json         # os cinco projetos (cor, logo, resumo, link)
      events.json           # eventos
      gallery.json          # fotos da galeria
    lib/
      types.ts              # tipos de todo o conteúdo
      content.ts            # única porta de acesso aos dados (getSite, getHome...)
  public/
    images/logos/           # logo principal e submarcas
    images/photos/          # fotos
```

## Decisões de arquitetura

**Conteúdo fora do código.** Nenhum texto, link, cor de submarca ou foto está escrito nos componentes; tudo vem de `src/data/*.json` e é tipado em `src/lib/types.ts`. Os componentes só recebem props.

**Uma porta única para os dados.** Páginas e layouts nunca importam os JSONs direto: chamam `getSite()`, `getHome()`, `getProjects()`, `getEvents()` e `getGallery()` de `src/lib/content.ts`. As funções já são `async` e marcadas como `server-only`. Quando o conteúdo passar para um banco ou CMS, muda só o corpo delas.

**Servidor por padrão, cliente só onde precisa.** As seções são Server Components (HTML pronto, zero JS). Só rodam no navegador: o Header (menu mobile e sombra no scroll), a Galeria (lightbox), o `Reveal` (animação de entrada) e o `CountUp` (contador). O `Reveal` só embrulha o conteúdo, que continua sendo renderizado no servidor.

**Espaço para o painel.** O site público fica no grupo de rotas `app/(site)`. O painel de edição entra como `app/(admin)`, com layout e regras de acesso próprios, sem mexer no site.

## Como editar conteúdo (por enquanto)

Editar o JSON correspondente em `web/src/data/` e rodar o build. Exemplos:

- **Adicionar um projeto:** nova entrada em `projects.json` (id, nome, cores, logo, resumo, link) e o logo em `public/images/logos/`. O card e o link no rodapé aparecem sozinhos.
- **Trocar o evento:** editar `events.json`. Dá para ter vários; eles empilham.
- **Esconder o card "+ Novos projetos" ou o bloco "Proposta · sem código":** remover `projects.placeholderCard` ou `proposal` de `home.json`.
- **Ícones:** os campos `icon` aceitam os nomes listados em `IconName` (`src/lib/types.ts`).

## Próximos passos: login e edição

Nada disso está implementado ainda. O caminho previsto:

1. Escolher onde o conteúdo vai morar (banco próprio, como Postgres, ou um headless CMS) e reescrever `src/lib/content.ts` para ler de lá.
2. Adicionar autenticação e proteger `app/(admin)` com `proxy.ts` (no Next 16 o antigo `middleware.ts` passou a se chamar `proxy`).
3. Criar as telas do painel usando os mesmos tipos de `types.ts` e salvar via Server Actions, revalidando as páginas públicas depois de cada edição.
4. Formulários reais (voluntário, agendamento de visitas) e emissão de certificados como rotas/Server Actions.

**Hospedagem:** hoje todas as páginas saem estáticas no build, mas com login e painel o site precisa de um servidor Node (ou Vercel). Não dá para ficar só no GitHub Pages como o Mineração MG.

## O que mudou em relação ao mockup

A experiência visual é a mesma. Mudanças pontuais:

- Os números das estatísticas saem prontos no HTML do servidor (antes apareciam como "0" sem JS) e só animam se estiverem fora da tela ao carregar.
- A galeria não deixa mais um buraco na grade no desktop (as duas últimas fotos ficaram largas).
- As fontes são auto-hospedadas e têm fallback; os botões não caem mais para Times New Roman quando a fonte falha.
- O texto do botão "Seja voluntário" do rodapé voltou a ser branco (herdava a cor apagada dos links do rodapé).
- Favicon, meta description e Open Graph (prévia do link no WhatsApp/Instagram).
- "Abrir o mapa" aponta para o Mineração MG publicado.
- Itens da galeria são `<button>` de verdade e os passos do voluntariado são uma lista ordenada.

## Pendências herdadas do mockup

- **Placeholders:** números das estatísticas, evento (IV Congresso "Set/2025, a confirmar" já passou) e todos os links `#` (voluntário, visitas, certificados, relatórios, "Saiba mais", "Ver todas as fotos").
- **Texto:** o Sobre fala em "Instituto de Química"; na UFMG é o Departamento de Química do ICEx.
- **Fontes oficiais:** Intervogue Soft Black e Mundial são pagas. Quando licenciadas, carregar com `next/font/local` e trocar `--font-display` e `--font-body` em `globals.css`.
- **Cor da submarca Pelo Mundo:** teal `#02A896` (usado) ou azul `#3840A0`, a confirmar com o designer.
- **Logo da UFMG / DQ** para uma faixa "Realização".
- **Direitos de uso das fotos** (vieram do site atual).

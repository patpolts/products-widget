export default defineAppConfig({
  ui: {
    gray: 'cool',
    colors:{
      secondary: 'gray',
      tertiary: 'stone',
      neutral: 'neutral',
      info: 'sky',
      warning: 'amber'
    },
    container: {
      base: 'w-full max-w-dvw m-auto gap-4 md:gap-8 lg:gap-10 px-[var(--ui-padding-sm)] py-[var(--ui-padding-sm)] md:px-[var(--ui-padding-md)] md:py-[var(--ui-padding-md)] lg:px-[var(--ui-padding-lg)] lg:py-[var(--ui-padding-lg)] xl:px-[var(--ui-padding-xl)] xl:py-[var(--ui-padding-xl)]'
    },
    card: {
      variants: {
        subtle: {
          root: ''
        }
      },
      slots: {
        root: 'h-full w-full text-center rounded-md',
        header: 'p-0 sm:p-0 w-full max-w-dvw h-48 mb-6',
        body: 'products-card-spacing',
        footer: 'products-card-spacing flex'
      }
    },
    carousel: {
      slots: {
        root: 'w-full h-full'
      }
    }
  }
});

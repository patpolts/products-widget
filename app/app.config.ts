export default defineAppConfig({
  ui: {
    gray: 'cool',
    colors:{
      secondary: 'gray'
    },
    container: {
      base: 'w-full max-w-dvw m-auto gap-4 md:gap-6 p-4 md:p-8 lg:p-10'
    },
    card: {
      slots: {
        header: 'p-0 sm:p-0',
        body: 'p-2 md:p-4',
        footer: 'p-2 md:p-4'
      }
    }
  }
});

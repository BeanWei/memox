export default defineBackground(() => {
  // @ts-ignore // TODO: upgrade @types/webextension-polyfill
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: any) => console.error(error))
})

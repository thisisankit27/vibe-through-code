export const THEME_STORAGE_KEY = "vtc-theme";
export type ThemeName = "paper" | "dark";

/**
 * Applies the stored theme before first paint.
 *
 * Runs synchronously while the browser parses <head>, so a returning
 * visitor who chose dark never sees a flash of paper. Follows the Next
 * "preventing flash before hydration" guide.
 *
 * Note this does NOT follow prefers-color-scheme. Paper is the primary
 * identity, so it is what an unconfigured visitor gets; dark is a choice
 * they make and we then remember. Honouring the system preference is a
 * one-line change here if that call is ever revisited.
 */
const script = `(function(){try{
var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
if(t!=="dark"&&t!=="paper")return;
var e=document.documentElement;
e.classList.remove("theme-paper","theme-dark");
e.classList.add("theme-"+t);
}catch(e){}})()`;

export function ThemeScript() {
    return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

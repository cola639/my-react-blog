import marked from "marked";
import hljs from "highlight.js";

export default function MarkdownData(content) {
  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (content) {
      return hljs.highlightAuto(content).value;
    },
  });
  return marked(content);
}

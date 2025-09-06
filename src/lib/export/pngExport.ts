import html2canvas from "html2canvas";

export async function exportElementToPng(element: HTMLElement, filename = "poster.png") {
  const canvas = await html2canvas(element, {
    useCORS: true,
    backgroundColor: "#ffffff",
    scale: 2,
  });
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}



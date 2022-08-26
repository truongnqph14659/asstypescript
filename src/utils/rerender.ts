export async function rerender(elementId:string, content:any) {
    if (elementId) {
        document.querySelector(elementId)!.innerHTML = await content.render();
    }
    if (content.afterRender) content.afterRender();
}
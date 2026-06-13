function showPage(pageId){

    // ซ่อนทุกหน้า
    const pages =
    document.querySelectorAll(".page");

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    // แสดงหน้าที่เลือก
    document
    .getElementById(pageId)
    .classList.add("active");
}

// โหลดหน้าแรก
document.addEventListener(
    "DOMContentLoaded",
    ()=>{
        showPage("overview");
    }
);

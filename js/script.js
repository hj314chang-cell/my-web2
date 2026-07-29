// 스크롤 시 현재 보고 있는 주제를 상단 네비게이션에 표시
const sections = document.querySelectorAll(".topic[id]");
const navLinks = document.querySelectorAll(".topic-nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));

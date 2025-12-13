// ✅ 1) 행사 날짜/시간 설정 (여기만 바꾸면 D-Day 자동 계산됨)
const EVENT_ISO = "2025-12-21T14:00:00+09:00"; // 한국시간 기준

function formatDateKorean(isoString) {
  const d = new Date(isoString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const day = dayNames[d.getDay()];
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} (${day}) ${hh}:${min}`;
}

function updateDday() {
  const now = new Date();
  const eventDate = new Date(EVENT_ISO);

  const diffMs = eventDate - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const el = document.getElementById("dday");
  if (!el) return;

  if (diffMs > 0) el.textContent = `D-${diffDays}`;
  else el.textContent = "진행/종료";
}

function initCopyInvite() {
  const btn = document.getElementById("copyInvite");
  const invite = document.getElementById("inviteText");
  if (!btn || !invite) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(invite.textContent.trim());
      btn.textContent = "복사 완료!";
      setTimeout(() => (btn.textContent = "초대 문구 복사"), 1200);
    } catch {
      alert("복사 권한이 없어서 실패했습니다. 초대 문구를 직접 선택해 복사해 주세요.");
    }
  });
}

function initToggleTimes() {
  const btn = document.getElementById("toggleTimes");
  const times = document.querySelectorAll(".time");
  if (!btn || !times.length) return;

  let show = true;
  btn.addEventListener("click", () => {
    show = !show;
    times.forEach((t) => (t.style.display = show ? "block" : "none"));
  });
}

(function init() {
  const dateText = document.getElementById("eventDateText");
  if (dateText) dateText.textContent = formatDateKorean(EVENT_ISO);

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  updateDday();
  setInterval(updateDday, 60 * 1000);

  initCopyInvite();
  initToggleTimes();
})();

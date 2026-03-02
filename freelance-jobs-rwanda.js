const jobs = [
  {
    title: "PowerPoint Designer for School Project",
    company: "Kigali Learning Center",
    category: "ppt",
    pay: "RWF 40,000"
  },
  {
    title: "Document Formatter and Typist",
    company: "Business Support Rwanda",
    category: "docs",
    pay: "RWF 30,000"
  },
  {
    title: "Spreadsheet Data Entry Assistant",
    company: "AgriData Co",
    category: "data",
    pay: "RWF 35,000"
  },
  {
    title: "Social Media Poster Creator",
    company: "Kigali Creatives",
    category: "design",
    pay: "RWF 45,000"
  }
];

function renderJobs(category = "all") {
  const jobList = document.getElementById("jobList");
  const visibleJobs = jobs.filter((job) => category === "all" || job.category === category);

  if (visibleJobs.length === 0) {
    jobList.innerHTML = "<p>No jobs found for this service yet.</p>";
    return;
  }

  jobList.innerHTML = visibleJobs
    .map(
      (job) => `
      <article class="job-card">
        <h3>${job.title}</h3>
        <p><strong>Client:</strong> ${job.company}</p>
        <p><strong>Estimated pay:</strong> ${job.pay}</p>
        <span class="tag">${job.category.toUpperCase()}</span>
      </article>
    `
    )
    .join("");
}

function setupFilter() {
  const select = document.getElementById("jobType");
  select.addEventListener("change", (event) => {
    renderJobs(event.target.value);
  });
}

function setupForm() {
  const form = document.getElementById("applicationForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const payload = {
      fullName: data.get("fullName")?.toString().trim(),
      email: data.get("email")?.toString().trim(),
      service: data.get("service")?.toString().trim(),
      experience: data.get("experience")?.toString().trim()
    };

    const valid = Object.values(payload).every(Boolean);

    if (!valid) {
      message.textContent = "Please fill in all required fields.";
      message.style.color = "#b42318";
      return;
    }

    const submissions = JSON.parse(localStorage.getItem("freelanceApplications") || "[]");
    submissions.push({ ...payload, submittedAt: new Date().toISOString() });
    localStorage.setItem("freelanceApplications", JSON.stringify(submissions));

    message.textContent = "Application submitted successfully. We will contact you soon.";
    message.style.color = "#067647";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderJobs();
  setupFilter();
  setupForm();
});

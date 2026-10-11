import type { ReactNode } from "react";

export type ReportPage = {
  img: string;
  name: string;
  q: string;
  body: string;
  list: string[];
  reads: [string, string][];
};

export type Chip = { t: string; kind?: "fact" | "param" };

export type BuildCol = {
  title: string;
  desc: ReactNode;
  chips: Chip[];
  chipsLabel: string;
  legend?: { label: string; bg: string; border: string }[];
};

export type Project = {
  slug: string;
  title: string;
  status: ["ok" | "wip", string];
  img: string;
  blurb: string;
  tags: string[];
  lede: string;
  meta: [string, string][];
  overview: string[];
  questions: [string, string][];
  stats?: [string, string][];
  report: { file: string; heading: string; eyebrow: string; pages: ReportPage[] };
  fixes?: { intro: string; items: [string, string][] };
  build: { heading: string; cols: BuildCol[] };
  prev: { href: string; small: string; label: string };
  next: { href: string; small: string; label: string };
};

const LEGEND_FACT = { bg: "var(--soft)", border: "#B9C9E2" };
const LEGEND_DIM = { bg: "var(--bg)", border: "var(--line)" };
const LEGEND_CALC = { bg: "var(--ok-bg)", border: "#B7DCCB" };

const chips = (items: (string | [string, "fact" | "param"])[]): Chip[] =>
  items.map((x) => (typeof x === "string" ? { t: x } : { t: x[0], kind: x[1] }));

export const projects: Project[] = [
  {
    slug: "people-analytics",
    title: "People Analytics Command Center",
    status: ["ok", "Complete"],
    img: "/img/executive-overview.jpg",
    blurb:
      "Headcount, attrition risk and capacity planning across ten departments, in three linked report pages.",
    tags: ["Power BI", "DAX", "Star schema", "What-if parameter"],
    lede: "A three-page Power BI report that tracks headcount, flags attrition risk and plans capacity across ten departments.",
    meta: [
      ["Tool", "Power BI Desktop"],
      ["Domain", "HR & workforce"],
      ["Report pages", "3"],
      ["Data", "Sample HR dataset, 4,052 employees"],
    ],
    overview: [
      "HR leaders, business partners and finance each look at the same workforce from a different angle. Leadership wants the headline numbers, HR wants to know who might leave, and finance wants to know whether staffing matches budget.",
      "I gave each audience its own page and kept one model, one set of measures and one pair of slicers underneath, so a date range or department picked on one page carries through the whole report.",
    ],
    questions: [
      ["Executive Overview", "How big is the workforce, and where are we losing people?"],
      ["Attrition & Risk", "Who is likely to leave, and is it a department problem?"],
      ["Capacity Planning", "Are we staffed to plan, and what happens if we grow?"],
    ],
    report: {
      file: "People_Analytics_Command_Center.pbix",
      eyebrow: "The report",
      heading: "Page by page",
      pages: [
        {
          img: "/img/executive-overview.jpg",
          name: "Executive Overview",
          q: "How big is the workforce, and where are we losing people?",
          body: "The one-minute view for leadership. Six KPI cards up top, then attrition by department and the headcount trend, all filtered by one date range and one department slicer.",
          list: [
            "Six KPI cards: headcount, attrition rate, high-risk count, MoM change, FTE variance, utilization",
            "Attrition rate by department, one fixed color per department",
            "Monthly headcount trend with data labels",
            "Date range and department slicers, synced across pages",
          ],
          reads: [
            ["10.12%", "overall attrition across 4K active employees"],
            ["12.9", "Customer Support has the highest attrition rate; Sales the lowest at 7.0"],
            ["1.4K→3.2K", "monthly headcount over the selected period, Aug 2022 to Jan 2025"],
          ],
        },
        {
          img: "/img/attrition-risk.jpg",
          name: "Attrition & Risk",
          q: "Who is likely to leave, and is it a department problem?",
          body: "A quick audit for HR business partners. Every employee carries a risk score and tier; the table lists high-risk names so someone can follow up, and engagement by department shows whether risk clusters anywhere.",
          list: [
            "Donut of employees by risk tier: Low, Medium, High in green, orange, red",
            "Employee table with department, job title, risk score and tier",
            "Average engagement score by department",
            "Date range slicer synced with the other pages",
          ],
          reads: [
            ["62.66%", "of 4,052 employees are low risk (2.54K)"],
            ["7.16%", "are high risk, about 290 people who need a retention conversation"],
            ["70–73", "engagement sits in a narrow band across all ten departments, which points to individual rather than department-wide risk"],
          ],
        },
        {
          img: "/img/capacity-planning.jpg",
          name: "Capacity Planning",
          q: "Are we staffed to plan, and what happens if we grow?",
          body: "For finance and workforce planning. Actual FTE against budget by department, utilization alongside it, and a growth parameter that projects next period's headcount and FTE gap.",
          list: [
            "Four KPI cards: utilization, FTE variance, projected headcount, projected FTE variance",
            "Department table: actual vs budgeted FTE, variance and utilization",
            "FTE variance by department, sorted high to low",
            "Headcount Growth % what-if slicer",
          ],
          reads: [
            ["87.54%", "average capacity utilization"],
            ["2,485.5", "FTE variance: 3,585.5 actual against 1,100 budgeted. Engineering has the largest gap at 276.6"],
            ["4.46K", "projected headcount at 10% growth, widening the FTE gap to 2.73K"],
          ],
        },
      ],
    },
    build: {
      heading: "Model, measures and interaction",
      cols: [
        {
          title: "Star schema",
          desc: "Fact tables at different grains share date and department dimensions, so one slicer filters every page.",
          chipsLabel: "Tables in the model",
          chips: chips([
            ["ATTRITION_TTM", "fact"], ["MONTHLY_HEADCOUNT", "fact"], ["CAPACITY_PLANNING", "fact"], ["ATTRITION_RISK_SCORE", "fact"],
            "DIM_DATE", "DIM_DEPARTMENT", "STG_EMPLOYEES", "TENURE_BUCKETS", "EXEC_KPI_SNAPSHOT",
          ]),
          legend: [
            { label: "Fact", ...LEGEND_FACT },
            { label: "Dimension / staging", ...LEGEND_DIM },
          ],
        },
        {
          title: "Measures",
          desc: (
            <>
              Every KPI is a DAX measure in a dedicated <code>_Measures</code> table, so each card shows one defined number.
            </>
          ),
          chipsLabel: "Measures",
          chips: chips([
            "Total Active Headcount", "Overall Attrition Rate %", "High Risk Employees", "Headcount MoM Change",
            "FTE Variance Total", "Avg Capacity Utilization %", "Projected Headcount", "Projected FTE Variance",
          ]),
        },
        {
          title: "Interaction",
          desc: "Date and department slicers are synced across all three pages. A what-if parameter on Capacity Planning lets a planner set expected growth and watch the projections update.",
          chipsLabel: "Parameters and slicers",
          chips: chips([["Headcount Growth %", "param"], "Date range slicer", "Department slicer"]),
        },
      ],
    },
    prev: { href: "/projects/", small: "Back to", label: "All projects" },
    next: { href: "/projects/servicenow/", small: "Next project", label: "ServiceNow IT Analytics →" },
  },

  {
    slug: "servicenow",
    title: "ServiceNow IT Analytics",
    status: ["ok", "Complete"],
    img: "/img/sn-incident-management.jpg",
    blurb:
      "Incident volume, change delivery and team performance, with a three-month incident forecast, in four report pages.",
    tags: ["Power BI", "DAX", "Data cleaning", "Forecasting"],
    lede: "A four-page Power BI report on IT operations: incident volume and resolution, change delivery, team performance, and a three-month incident forecast.",
    meta: [
      ["Tool", "Power BI Desktop"],
      ["Domain", "IT service management"],
      ["Report pages", "4"],
      ["Data", "1,000 incidents, 500 changes"],
    ],
    overview: [
      "IT service managers need to know how many incidents are coming in, how fast they get fixed, whether changes land safely, and which teams need help. This report answers those questions from ServiceNow-style incident and change data.",
      "Each page serves one question, and the date range and team slicers filter everything, so a manager can move from the overall picture to one team in a click.",
    ],
    questions: [
      ["Incident Management", "How many incidents are we handling, and how fast are they fixed?"],
      ["Change Management", "Are changes landing safely?"],
      ["Team Performance", "Which teams resolve fastest, and are they hitting targets?"],
      ["Trends & Forecast", "What volume should we expect next, and is the backlog growing?"],
    ],
    report: {
      file: "ServiceNow_IT_Analytics.pbix",
      eyebrow: "The report",
      heading: "Page by page",
      pages: [
        {
          img: "/img/sn-incident-management.jpg",
          name: "Incident Management",
          q: "How many incidents are we handling, and how fast are they fixed?",
          body: "The operations summary. Four KPI cards, incidents by severity and status, the monthly trend, and the five busiest categories.",
          list: [
            "KPI cards: critical incidents, mean time to resolve, total incidents, SLA compliance",
            "Incidents by severity and by status (open vs resolved)",
            "Incidents raised per month, Sep 2025 to Aug 2026",
            "Top 5 incident categories",
          ],
          reads: [
            ["1,000", "incidents logged over 12 months; 802 are Low severity and 19 Critical"],
            ["124.2 hrs", "mean time to resolve, about five days, driven by the Low-priority volume"],
            ["9.4%", "of resolved incidents met their SLA target: urgent tickets are fixed the same day, most Low tickets miss the 48-hour target"],
          ],
        },
        {
          img: "/img/sn-change-management.jpg",
          name: "Change Management",
          q: "Are changes landing safely?",
          body: "For change managers. Outcomes, change types, how quickly changes are carried out, and whether risk ratings predict failure.",
          list: [
            "KPI cards: total, completed and failed changes, average cycle time",
            "Changes by status and by change type",
            "Cycle time trend by month",
            "Change outcome by risk level",
          ],
          reads: [
            ["465 of 500", "changes completed; 23 were rolled back and 12 failed"],
            ["0.53 days", "average cycle time: most changes go out the same day or the next"],
            ["12 of 12", "failures were on changes rated Low risk; Medium and High risk changes were only ever rolled back"],
          ],
        },
        {
          img: "/img/sn-team-performance.jpg",
          name: "Team Performance",
          q: "Which teams resolve fastest, and are they hitting targets?",
          body: "For team leads. Gauges against targets, resolution time by team and priority, and how work moves between teams over time.",
          list: [
            "Gauges: productivity index, quality score, on-time delivery, resolution time, each against a target",
            "Resolution time by priority and team",
            "Heatmap of resolution days by team and priority",
            "Top teams over time (ribbon chart)",
          ],
          reads: [
            ["0.93", "quality score, just under the 0.95 target"],
            ["0.99", "on-time delivery: changes executed within a day of being raised"],
            ["5.02–5.28", "days: all five teams sit in a narrow range, so P4 tickets, at about six days, drive the average"],
          ],
        },
        {
          img: "/img/sn-trends-forecast.jpg",
          name: "Trends & Forecast",
          q: "What volume should we expect next, and is the backlog growing?",
          body: "For planning. Incident volume with a three-month forecast, open vs resolved by month, resolution time over time, and a category-by-month heatmap.",
          list: [
            "Incident volume with a 3-month forecast and 95% range",
            "Open vs resolved incidents by month",
            "Average resolution time by month",
            "Incidents by category and month (heatmap)",
          ],
          reads: [
            ["102", "incidents in Jul 2026, the peak month, before falling to 68 in August"],
            ["4.8–5.6", "days: monthly resolution time stayed flat even when volume rose"],
            ["15", "incidents from Sep 2025 are still open; every month has unresolved tickets, an aging backlog"],
          ],
        },
      ],
    },
    fixes: {
      intro:
        "The first version of this report showed numbers that looked plausible and were wrong. Finding and fixing these was most of the work.",
      items: [
        ["IDs that didn't match", "Incidents used TEAM1 and CAT1 while the lookup tables used TEAM001 and CAT001, so every incident fell into \"(Blank)\". Calculated columns standardize the IDs and the relationships now hold."],
        ["A KPI copying another KPI", "On-Time Delivery reused the Quality Score formula and showed the same 0.93. I rewrote it to measure changes executed within a day of being raised; the real figure is 0.99."],
        ["Dates with no times", "The source data stores dates without times, so incidents fixed the same day measure as 0. That explains the 0-day P1/P2 results and the 9.4% SLA figure; the report says so in the chart notes, and resolution time is reported in days."],
        ["Month axes that mixed years", "Trend charts plotted month numbers, adding Sep 2025 and Sep 2026 together. New month columns keep the year, and the partial current month is filtered out."],
        ["Charts that repeated each other", "A priority donut split changes by an unrelated incident field (25% each). It became Change Outcome by Risk Level, which shows all 12 failures were low-risk changes."],
      ],
    },
    build: {
      heading: "Model, measures and interaction",
      cols: [
        {
          title: "Model",
          desc: "Incident and change facts joined to team, category and date dimensions, with calculated columns to repair keys and build month axes.",
          chipsLabel: "Tables and columns",
          chips: chips([
            ["incidents", "fact"], ["changes", "fact"], ["assignments", "fact"], "teams", "categories", "dim_date",
            ["team_id_fixed", "param"], ["category_id_fixed", "param"], ["created_month", "param"], ["change_month", "param"],
          ]),
          legend: [
            { label: "Fact", ...LEGEND_FACT },
            { label: "Dimension", ...LEGEND_DIM },
            { label: "Calculated column", ...LEGEND_CALC },
          ],
        },
        {
          title: "Measures",
          desc: "DAX with CALCULATE, FILTER, AVERAGEX, DATEDIFF and DIVIDE, with blanks and divide-by-zero handled.",
          chipsLabel: "Measures",
          chips: chips([
            "Avg MTTR (Hours)", "SLA Compliance %", "Quality Score", "On-Time Delivery",
            "Avg Resolution Time (Days)", "Avg Cycle Time (Days)", "Failed Changes", "Team Productivity Index",
          ]),
        },
        {
          title: "Interaction",
          desc: "Date range and team slicers filter every visual. The forecast uses Power BI's built-in forecasting with a 95% confidence band, and the heatmaps use conditional formatting.",
          chipsLabel: "Features",
          chips: chips(["Date range slicer", "Team slicer", "3-month forecast", "Conditional formatting", "Custom theme"]),
        },
      ],
    },
    prev: { href: "/projects/people-analytics/", small: "Previous project", label: "← People Analytics Command Center" },
    next: { href: "/projects/onboarding/", small: "Next project", label: "Client Onboarding Tracker →" },
  },

  {
    slug: "onboarding",
    title: "Client Onboarding Tracker",
    status: ["ok", "Complete"],
    img: "/img/ob-thumb.jpg",
    blurb:
      "Healthcare client onboarding from contract to go-live, with risk automations and a leadership dashboard for health, capacity and delivery.",
    tags: ["monday.com", "Automations", "Formulas", "Dashboards"],
    lede: "A monday.com board and dashboard that follows every new client from signed contract to go-live, with automations that flag risk and a leadership view of health, capacity and delivery.",
    meta: [
      ["Tool", "monday.com"],
      ["Domain", "Client onboarding, healthcare"],
      ["Built", "Board + dashboard"],
      ["Data", "Sample data, 27 clients"],
    ],
    overview: [
      "A team onboarding new healthcare clients needs one place to see where every client stands, what's slipping and why, who's carrying too much, and what goes live next. Leadership wants the same picture without opening the board.",
      "I built the board first, with a status, milestone, owner and dates for every client. Automations handle the routine updates, and a dashboard on top answers leadership's questions at a glance. Client names and figures are sample data.",
    ],
    questions: [
      ["Portfolio health", "How many clients are live, on track, or need attention?"],
      ["Capacity", "Who owns which clients, and is anyone overloaded?"],
      ["Delivery", "What's going live when, and are we hitting our dates?"],
      ["Escalation", "Which clients need action now, and why?"],
    ],
    stats: [
      ["27", "Clients tracked"],
      ["13", "Live"],
      ["5", "Need attention"],
      ["57%", "Go-lives on time"],
    ],
    report: {
      file: "monday.com · Client Onboarding Overview",
      eyebrow: "The build",
      heading: "View by view",
      pages: [
        {
          img: "/img/ob-board.jpg",
          name: "Onboarding board",
          q: "Where is every client right now?",
          body: "The working view for the team. One row per client with its status, specialty, client type, owner and current milestone, so anyone can see where an onboarding stands without asking.",
          list: [
            "Status labels: Not Started, On Track, At Risk, Delayed, Live, Ramp Down",
            "Milestones from Kickoff through Billing Setup and Test Claims to Live",
            "Specialty, client type and onboarding owner for filtering and charts",
            "Every column typed (status, date, number) so automations can use it",
          ],
          reads: [
            ["27", "clients tracked from contract to go-live, across 5 specialties and 4 client types"],
            ["13", "are live; 7 are on track, 2 at risk, 3 delayed, 1 not started and 1 ramping down"],
            ["3", "automations handle the routine updates: risk alerts, go-live date stamps and auto-delay"],
          ],
        },
        {
          img: "/img/ob-delivery.jpg",
          name: "Delivery tracking",
          q: "Are we hitting our go-live dates?",
          body: "The same board, scrolled to the delivery columns. Target and actual go-live dates sit side by side, and a Days Late formula turns them into one number per client.",
          list: [
            "Contract signed, target go-live and actual go-live dates",
            "Providers per client, a proxy for billing volume",
            "Risk level and a short risk note on every at-risk client",
            "Days Late formula: negative means early, blank until live",
          ],
          reads: [
            ["8 of 14", "go-lives landed on or before their target date (57%)"],
            ["~5 days", "average slip on the 6 late go-lives; the worst was 10 days"],
            ["Blank", "until a client goes live, so open onboardings don't skew the on-time rate"],
          ],
        },
        {
          img: "/img/ob-dashboard.jpg",
          name: "Leadership dashboard",
          q: "How healthy is the portfolio, and what's coming up?",
          body: "For leadership. Status split, each owner's client load, go-lives forecast by month and stacked by status, and a calendar of upcoming go-lives coloured by risk.",
          list: [
            "Clients by status (pie)",
            "Client portfolio by owner, stacked by status",
            "Go-live forecast by month for in-flight clients",
            "Go-live calendar, coloured by status",
          ],
          reads: [
            ["November", "is the crunch month: 8 in-flight go-lives due, 2 of them already at risk"],
            ["8", "clients sit with one owner, the most on the team, including 2 of the 5 that need attention"],
            ["3", "delayed clients missed July to September targets and still aren't live"],
          ],
        },
        {
          img: "/img/ob-escalation.jpg",
          name: "Escalation list",
          q: "Which clients need action now, and why?",
          body: "The list a manager works from each week. Only At Risk and Delayed clients, with the owner, current milestone, target date, provider count and risk level in one row.",
          list: [
            "Filtered to At Risk and Delayed only",
            "Owner and milestone, so it's clear who acts and where",
            "Target go-live and provider count to size the impact",
            "Risk level and note carried over from the board",
          ],
          reads: [
            ["5", "clients need attention: 2 at risk and 3 delayed"],
            ["3 of 5", "are stuck at Test Claims, the clearest bottleneck in the process"],
            ["Jul 20", "the oldest missed target, a radiology client held up by an EHR integration issue"],
          ],
        },
      ],
    },
    fixes: {
      intro:
        "A dashboard is only as good as the board under it. These came up during the build, and each one would have put a wrong number in front of leadership.",
      items: [
        ["Dates imported as text", "The CSV import brought contract and go-live dates in as plain text, so date automations and the calendar couldn't read them. I converted all three to Date columns."],
        ["A chart adding up running totals", "The owner chart showed one person with 27 clients, the whole board, because it was summing cumulatively. With that switched off, the real split is 4, 5, 5, 5 and 8."],
        ["A record that contradicted itself", "One client was marked Not Started but had an actual go-live date in the future. I cleared the date and corrected the milestone and contract date so it reads as a new client."],
        ["A KPI counting the wrong thing", "The Needs Attention tile was filtered to Not Started and showed 1. Refiltered to At Risk and Delayed, it shows 5, matching the escalation list."],
      ],
    },
    build: {
      heading: "Board, automations and dashboard",
      cols: [
        {
          title: "Board",
          desc: (
            <>
              One row per client, with typed columns so automations, charts and the calendar can use them. Days Late is a formula:{" "}
              <code>DAYS(Actual, Target)</code>, left blank until a client goes live.
            </>
          ),
          chipsLabel: "Board columns",
          chips: chips([
            ["Status", "fact"], ["Current Milestone", "fact"], "Specialty", "Client Type", "Onboarding Owner",
            "Contract Signed", "Target Go-Live", "Actual Go-Live", "Providers", "Risk Level", "Risk Note", ["Days Late", "param"],
          ]),
          legend: [
            { label: "Status column", ...LEGEND_FACT },
            { label: "Data column", ...LEGEND_DIM },
            { label: "Formula", ...LEGEND_CALC },
          ],
        },
        {
          title: "Automations",
          desc: "Three rules keep the board current without anyone remembering to update it.",
          chipsLabel: "Automations",
          chips: chips([
            "At Risk → alert with client, owner, milestone and risk note",
            "Live → stamp Actual Go-Live with today",
            "Target date arrives, not live → set Delayed",
          ]),
        },
        {
          title: "Dashboard",
          desc: "KPI tiles across the top, then health, capacity, a go-live forecast by month, a go-live calendar and an escalation list, all filtered from the same board.",
          chipsLabel: "Dashboard widgets",
          chips: chips(["KPI tiles", "Clients by Status", "Portfolio by Owner", "Go-Live Forecast", "Go-live calendar", "Escalation list"]),
        },
      ],
    },
    prev: { href: "/projects/servicenow/", small: "Previous project", label: "← ServiceNow IT Analytics" },
    next: { href: "/projects/", small: "Back to", label: "All projects" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

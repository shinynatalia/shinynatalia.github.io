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
    next: { href: "/projects/denials/", small: "Next project", label: "Denials Management Tracker →" },
  },

  {
    slug: "denials",
    title: "Denials Management Tracker",
    status: ["ok", "Complete"],
    img: "/img/dn-thumb.jpg",
    blurb:
      "Healthcare claim denials from denial to appeal to resolution, with deadline automations and a leadership dashboard that shows where the money is lost and why.",
    tags: ["monday.com", "Revenue cycle", "Automations", "Dashboards"],
    lede: "A monday.com board and dashboard for a revenue cycle team: every denied claim tracked from denial to appeal to recovery, with automations that protect appeal deadlines and a leadership view of where denials come from.",
    meta: [
      ["Tool", "monday.com"],
      ["Domain", "Revenue cycle, healthcare"],
      ["Built", "Board + dashboard"],
      ["Data", "Sample data, 80 claims"],
    ],
    overview: [
      "When a payer denies a claim, the clock starts: each denial has an appeal deadline, and a missed deadline means the money is gone. A denials team needs to see which claims need action, who owns them, and which root causes keep producing denials so they can be fixed upstream.",
      "I built one board for the team's daily work, with the denial reason (CARC code), category, root cause, owner, priority and every key date. Automations keep it current, and a dashboard answers leadership's questions. Claims, clients and payers are sample data; payers are anonymised as Commercial Payer A to D.",
    ],
    questions: [
      ["Exposure", "How much is denied, how much have we recovered, and how much is still at risk?"],
      ["Root cause", "Which denial types and root causes cost the most?"],
      ["Workload", "Who owns which claims, and is anyone falling behind?"],
      ["Urgency", "Which claims need action before their appeal deadline?"],
    ],
    stats: [
      ["$50.5K", "Denied across 80 claims"],
      ["$12.1K", "Recovered on appeal"],
      ["$23.7K", "Still open"],
      ["44.8", "Avg days to resolve"],
    ],
    report: {
      file: "monday.com · Denials Management Tracker",
      eyebrow: "The build",
      heading: "View by view",
      pages: [
        {
          img: "/img/dn-board.jpg",
          name: "Denials board",
          q: "What was denied, and why?",
          body: "The working view for the denials team. One row per claim with the client, specialty, payer, CPT code, dates, denial category and CARC reason code, split into Open Denials and Resolved.",
          list: [
            "Open Denials and Resolved groups, so the team works from one list",
            "Denial category, CARC code and root cause on every claim",
            "CPT codes stored as labels so codes like 00790 keep their leading zeros",
            "Specialty, payer and client for filtering and charts",
          ],
          reads: [
            ["80", "denied claims across 14 clients, 5 specialties and 6 payers"],
            ["43", "are still open; 37 are resolved (25 won on appeal, 12 written off)"],
            ["9", "denial categories, each tied to a CARC reason code"],
          ],
        },
        {
          img: "/img/dn-resolution.jpg",
          name: "Deadlines & resolution",
          q: "How close are we to each deadline, and how long do claims take to close?",
          body: "The same board, scrolled to the workflow columns. Status, owner and priority drive the work; two formulas turn the dates into a countdown and a time-to-resolve figure.",
          list: [
            "Status: New, In Review, Appeal Sent, Resubmitted, Won, Written Off",
            "Days to Deadline formula: counts down only for claims not yet appealed",
            "Days to Resolve formula: days from denial to resolution",
            "Recovered amount recorded on every won appeal",
          ],
          reads: [
            ["44.8", "days on average from denial to resolution"],
            ["68%", "of resolved claims were won on appeal (25 of 37)"],
            ["91%", "of the denied amount was recovered on the claims we won"],
          ],
        },
        {
          img: "/img/dn-dashboard.jpg",
          name: "Leadership dashboard",
          q: "Where is the money being lost?",
          body: "The top of the Denials Command Center. Four KPI tiles, then denied dollars by denial category and by root cause, so leadership can see the size of the problem and where to fix it.",
          list: [
            "Total denied, recovered on appeal, open $ at risk, average days to resolve",
            "Denied $ by denial category, sorted smallest to largest",
            "Denied $ by root cause: front end, coding, clinical documentation, billing",
            "All widgets read live from the same board",
          ],
          reads: [
            ["32.7%", "of denied dollars are authorization denials ($16.5K), the largest category"],
            ["55.9%", "trace back to front-end steps such as eligibility and prior authorization"],
            ["85%", "of denied dollars were marked preventable"],
          ],
        },
        {
          img: "/img/dn-workload.jpg",
          name: "Workload & payers",
          q: "Who is carrying the load, and which payers deny the most?",
          body: "Claims by owner stacked by status show each person's open work and outcomes. Denied dollars by payer, stacked by category, show which payer and denial type to tackle first.",
          list: [
            "Claims by owner, stacked by status",
            "Denied $ by payer, stacked by denial category",
            "Payers anonymised as Commercial Payer A to D",
          ],
          reads: [
            ["23", "claims sit with one owner, including 7 written off and 8 waiting on appeals"],
            ["$19.2K", "denied by Medicare, the highest of any payer"],
            ["$8.5K", "of that is authorization, the single biggest payer and category combination"],
          ],
        },
        {
          img: "/img/dn-urgent.jpg",
          name: "Urgent claims",
          q: "Which claims need action now?",
          body: "The list a team lead works from each morning: every open claim marked High priority, with payer, category, amount, status, owner, appeal deadline and the days left to appeal.",
          list: [
            "Filtered to open claims with High priority",
            "Owner and status show who acts next",
            "Appeal deadline and Days to Deadline show how much time is left",
            "Priority is raised automatically 14 days before a deadline",
          ],
          reads: [
            ["13", "open claims are high priority, worth $13.0K"],
            ["5", "of them haven't been appealed yet, with deadlines from mid-December to late January"],
            ["3", "are authorization denials, the category the dashboard flags as the costliest"],
          ],
        },
      ],
    },
    fixes: {
      intro:
        "Most of the risk in a denials tracker is in the data. These came up during the build, and each would have given the team a wrong picture.",
      items: [
        ["CPT codes lost their leading zeros", "The import treated CPT codes as numbers, so anesthesia code 00790 became 790 and others gained commas (99,283). Changing the column type restored the original codes, and the old column was removed."],
        ["Reason codes stored as numbers", "CARC codes came in as a number column, which the board was summing like money. I converted it to text so it reads as a code."],
        ["A priority scale that read backwards", "Medium was red and High was orange, so the most urgent claims looked less urgent. High is now red, Medium yellow and Low green."],
        ["Resolved claims mixed in with open work", "All 80 claims sat in one group. I split them into Open Denials and Resolved, and automations now move a claim as soon as it's won or written off."],
      ],
    },
    build: {
      heading: "Board, automations and dashboard",
      cols: [
        {
          title: "Board",
          desc: (
            <>
              One row per denied claim. Days to Deadline is{" "}
              <code>IF(AND({"{Appeal Sent}"}="", {"{Resolved Date}"}=""), DAYS({"{Appeal Deadline}"}, TODAY()), "")</code>, so it only counts down
              for claims that still need an appeal.
            </>
          ),
          chipsLabel: "Board columns",
          chips: chips([
            ["Status", "fact"], ["Priority", "fact"], "Payer", "CPT", "Denial Category", "CARC Code", "Root Cause", "Preventable",
            "Denied Amount", "Appeal Deadline", "Appeal Sent", "Recovered Amount", ["Days to Deadline", "param"], ["Days to Resolve", "param"],
          ]),
          legend: [
            { label: "Status column", ...LEGEND_FACT },
            { label: "Data column", ...LEGEND_DIM },
            { label: "Formula", ...LEGEND_CALC },
          ],
        },
        {
          title: "Automations",
          desc: "Three rules keep the board current and protect appeal deadlines.",
          chipsLabel: "Automations",
          chips: chips([
            "Won → move to Resolved, stamp Resolved Date",
            "Written Off → move to Resolved, stamp Resolved Date",
            "14 days before deadline, no appeal → alert + Priority High",
          ]),
        },
        {
          title: "Dashboard",
          desc: "KPI tiles across the top, then where denials come from, who owns them, which payers deny the most, and an urgent list, all from the same board.",
          chipsLabel: "Dashboard widgets",
          chips: chips(["KPI tiles", "Denied $ by category", "Denied $ by root cause", "Claims by owner & status", "Denied $ by payer & category", "Urgent claims list"]),
        },
      ],
    },
    prev: { href: "/projects/onboarding/", small: "Previous project", label: "← Client Onboarding Tracker" },
    next: { href: "/projects/hubspot/", small: "Next project", label: "Client Onboarding CRM →" },
  },

  {
    slug: "hubspot",
    title: "Client Onboarding CRM",
    status: ["ok", "Complete"],
    img: "/img/hs-thumb.jpg",
    blurb:
      "The same 27 onboarding clients in HubSpot: a custom pipeline and properties, workflows that alert on risk and go-live changes, and a live leadership dashboard.",
    tags: ["HubSpot", "CRM", "Workflows", "Dashboards"],
    lede: "A HubSpot setup for a client onboarding team: every client as a linked company, contact and deal, an onboarding pipeline, workflows that turn status changes into alerts and owned tasks, and a dashboard leadership can read at a glance.",
    meta: [
      ["Tool", "HubSpot (Sales Hub Professional trial)"],
      ["Domain", "Client onboarding, healthcare"],
      ["Built", "Pipeline, 10 properties, 3 workflows, dashboard"],
      ["Data", "Sample data, 27 clients"],
    ],
    overview: [
      "Onboarding teams often run the day-to-day work in a project tool and keep the client record in a CRM. This project is the CRM half of my Client Onboarding Tracker: the same 27 sample clients, held in HubSpot so status, dates and risk live on the client record and changes reach the right person automatically.",
      "I designed the structure before loading any data: a Client Onboarding pipeline and ten custom company properties with the right field types. Then I imported one file as three linked objects, built three workflows and a six-report dashboard, and tested the automation on a real record. Client names, contacts and figures are sample data.",
    ],
    questions: [
      ["Health", "How many clients are on track, delayed, at risk or live?"],
      ["Pipeline", "Which onboarding stage is each client in, and is anything overdue?"],
      ["Capacity", "Who is carrying the most clients, and when is the next go-live crunch?"],
      ["Response", "When a client slips, does someone hear about it and own the next step?"],
    ],
    stats: [
      ["27", "Onboarding clients"],
      ["81", "Linked records imported"],
      ["3", "Live workflows"],
      ["480", "Providers onboarding"],
    ],
    report: {
      file: "HubSpot · Client Onboarding CRM",
      eyebrow: "The build",
      heading: "View by view",
      pages: [
        {
          img: "/img/hs-pipeline.jpg",
          name: "Onboarding pipeline",
          q: "Where is every client in onboarding?",
          body: "The deal board, one card per client. I turned HubSpot's default sales pipeline into a seven-stage onboarding pipeline, so the board reads like the team's real process.",
          list: [
            "Kickoff, System Setup, Billing Setup, Test Claims, Go-Live Prep, Live, Ramp Down",
            "Live uses HubSpot's Closed Won stage and Ramp Down uses Closed Lost, so built-in win and time-to-close reports work for onboarding",
            "Close date holds the target go-live, so HubSpot flags overdue clients on the card",
            "Each deal is linked to its company and primary contact",
          ],
          reads: [
            ["27", "clients in the pipeline, matching the monday.com board exactly"],
            ["5", "are in Test Claims, the busiest open stage"],
            ["1", "client is flagged overdue: in Go-Live Prep with a target date that has passed"],
          ],
        },
        {
          img: "/img/hs-dashboard.jpg",
          name: "Health & workload",
          q: "How healthy is the portfolio, and who is carrying it?",
          body: "The top of the Client Onboarding Health dashboard. Clients by onboarding status, then each specialist's clients stacked by status.",
          list: [
            "Clients by Onboarding Status, filtered to clients with a status so the total is exactly 27",
            "Specialist Workload, stacked by status, to show each person's mix of live and at-risk work",
            "Built from report templates and customised: measure, dimension, filters and chart type",
            "One colour scheme on every chart that shows status: navy for Live, blue for On Track, orange for At Risk, light orange for Delayed and grey for Not Started and Ramp Down",
          ],
          reads: [
            ["13", "of 27 clients are live (48%)"],
            ["5", "need attention: 3 delayed and 2 at risk"],
            ["8", "clients sit with one specialist, twice as many as the lightest load"],
          ],
        },
        {
          img: "/img/hs-dashboard-2.jpg",
          name: "Capacity & watchlist",
          q: "How big is the work, when does it land, and which clients need help?",
          body: "The lower half of the dashboard. Providers by specialty, go-lives by target month, a watchlist of at-risk and delayed clients, and deals by pipeline stage.",
          list: [
            "Providers by specialty uses a sum, not a count, because providers drive the work, sorted largest first",
            "Go-lives grouped by Target Go-Live Date, month by month",
            "Watchlist filtered to At Risk and Delayed",
            "Deals by stage set to all time so it doesn't empty out next month",
          ],
          reads: [
            ["480", "providers across all clients; Anesthesia and Hospital Medicine are 69% of them"],
            ["9", "go-lives are due in November, the busiest month on the plan"],
            ["3", "of the 5 watchlist clients are delayed rather than at risk"],
          ],
        },
        {
          img: "/img/hs-workflows.jpg",
          name: "Workflows",
          q: "What happens automatically when something changes?",
          body: "Three company-based workflows, all published. Each starts from a property change, so only new changes trigger them and existing records weren't flooded with alerts.",
          list: [
            "At-Risk Client Alert: in-app alert with specialist, risk note and target date, then a High-priority call task due next business day, linked to the client",
            "Go-Live Date Changed: alert with the new date so billing and IT can re-plan",
            "Client Went Live: stamps Actual Go-Live Date automatically, then a 30-day check-in task",
            "Re-enrollment on, so a client who slips twice alerts twice",
          ],
          reads: [
            ["3", "workflows replace manual status emails and follow-up reminders"],
            ["1", "business day to follow up on any client that goes At Risk"],
            ["30", "days after go-live, a check-in task is created for the account"],
          ],
        },
        {
          img: "/img/hs-test.jpg",
          name: "Workflow test",
          q: "Does the automation actually work?",
          body: "I tested the At-Risk workflow on one client: changed its status, checked every step in Run History, confirmed the alert and the task, then set the client back so the data still matches the source.",
          list: [
            "Run History: trigger, notification, task and association all succeeded",
            "The alert filled in the client name, specialist and target date from the record",
            "The task appeared on the client's timeline, so anyone opening the record sees it",
          ],
          reads: [
            ["4", "of 4 steps succeeded on the first run"],
            ["53s", "from status change to finished run"],
            ["1", "test client, set back to its original status afterwards"],
          ],
        },
      ],
    },
    fixes: {
      intro:
        "Most of the risk in a CRM build is in the import and the report filters. These came up during the build, and each would have given the team a wrong picture.",
      items: [
        ["An import that would have dropped every contact", "The sample emails use a placeholder domain that HubSpot treats as invalid, and it skips any row with an invalid email. I left the email and domain columns out, so all 27 clients, contacts and deals came through."],
        ["A date mapped to the wrong object", "Auto-mapping sent Close date to a contact property. I remapped it to the deal's Close Date, where the target go-live belongs."],
        ["A report that counted half the clients", "The template filtered on Close Date, so it only counted the 13 live clients. Switching the date filter to Create Date brought back all 27."],
        ["A demo record in the totals", "HubSpot adds a sample company to new accounts, which made the total 28. Filtering on Onboarding Status removed it."],
      ],
    },
    build: {
      heading: "Data model, workflows and dashboard",
      cols: [
        {
          title: "Data model",
          desc: "One import created three linked objects per client: company, primary contact and onboarding deal. Custom properties sit on the company, with dropdowns so values stay consistent for workflows and reports.",
          chipsLabel: "Custom company properties",
          chips: chips([
            ["Onboarding Status", "fact"], ["Risk Level", "fact"], "Specialty", "Client Type", "Onboarding Specialist",
            "Number of Providers", "Contract Signed Date", "Target Go-Live Date", "Actual Go-Live Date", "Risk Note",
          ]),
          legend: [
            { label: "Dropdown with coloured badges", ...LEGEND_FACT },
            { label: "Other property", ...LEGEND_DIM },
          ],
        },
        {
          title: "Workflows",
          desc: "Each workflow pairs a notification with an owned next step, and links any task back to the client record.",
          chipsLabel: "Workflows",
          chips: chips([
            "Status → At Risk: alert + call task (1 business day)",
            "Target Go-Live Date changes: alert",
            "Status → Live: stamp Actual Go-Live Date + 30-day check-in",
          ]),
        },
        {
          title: "Dashboard",
          desc: "Six reports on one dashboard, each checked against the source file before publishing.",
          chipsLabel: "Dashboard reports",
          chips: chips(["Clients by status", "Specialist workload", "Providers by specialty", "Go-lives by month", "Clients needing attention", "Deals by stage"]),
        },
      ],
    },
    prev: { href: "/projects/denials/", small: "Previous project", label: "← Denials Management Tracker" },
    next: { href: "/projects/", small: "Back to", label: "All projects" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

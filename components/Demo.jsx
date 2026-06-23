import { useState } from "react";

// ── Brand tokens ──────────────────────────────────────────────────────
const C = {
  warmWhite: "#F7F5F2",
  sageMist:  "#E8EDE6",
  softSage:  "#C8DACE",
  green:     "#7BAE8A",
  fern:      "#3D7A58",
  lavender:  "#E8E0F0",
  lavMid:    "#9B79D4",
  offBlack:  "#2C2C2A",
  midGrey:   "#888780",
  lightGrey: "#D3D1C7",
  white:     "#FFFFFF",
  peach:     "#F5E8D8",
};

// ── Shared UI primitives ──────────────────────────────────────────────
const Badge = ({ children, color = C.fern, bg = C.sageMist, style = {} }) => (
  <span style={{
    display: "inline-block", padding: "3px 10px", borderRadius: 20,
    fontSize: 11, fontWeight: 600, color, background: bg, letterSpacing: "0.02em",
    ...style,
  }}>{children}</span>
);

const ProgressBar = ({ pct, color = C.green, height = 5 }) => (
  <div style={{ height, borderRadius: height, background: C.sageMist, overflow: "hidden" }}>
    <div style={{ width: `${pct}%`, height: "100%", borderRadius: height, background: color, transition: "width 0.6s ease" }} />
  </div>
);

const ScoreRing = ({ score, size = 72, label = "score" }) => {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const fill = (score / 10) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.sageMist} strokeWidth={5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.fern} strokeWidth={5}
          strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: size * 0.28, fontWeight: 700, fontFamily: "Georgia, serif", fill: C.fern }}>{score}</text>
      </svg>
      <span style={{ fontSize: 10, color: C.midGrey, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.white, borderRadius: 12, border: `1px solid ${C.lightGrey}`,
    padding: "16px 18px", ...style,
  }}>{children}</div>
);

const Wordmark = ({ size = 24, dark = true }) => (
  <span style={{ display: "inline-flex", alignItems: "flex-start" }}>
    <span style={{
      fontFamily: "Georgia, serif", fontWeight: 700, fontSize: size,
      color: dark ? C.offBlack : C.white, letterSpacing: "-0.03em", lineHeight: 1,
    }}>dobbı</span>
    <span style={{
      fontFamily: "sans-serif", fontWeight: 400, fontSize: size * 0.5,
      color: C.green, lineHeight: 1, marginTop: 1,
    }}>✳</span>
  </span>
);

// ── Step nav ──────────────────────────────────────────────────────────
const steps = ["Setup", "Schedule", "Free plan", "Premium", "Dashboard"];

const StepNav = ({ current }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 0,
    background: C.sageMist, borderRadius: 10, padding: "5px 8px",
    marginBottom: 18, overflowX: "auto",
  }}>
    {steps.map((s, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 5, padding: "4px 8px",
          borderRadius: 7,
          background: i === current ? C.fern : "transparent",
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: i < current ? C.green : i === current ? C.white : C.lightGrey,
          }} />
          <span style={{
            fontSize: 10, fontWeight: i === current ? 600 : 400,
            color: i === current ? C.white : i < current ? C.fern : C.midGrey,
            whiteSpace: "nowrap",
          }}>{s}</span>
        </div>
        {i < steps.length - 1 && <div style={{ width: 10, height: 1, background: C.lightGrey, flexShrink: 0 }} />}
      </div>
    ))}
  </div>
);

// ── SCREEN 1: Onboarding ──────────────────────────────────────────────
const SetupScreen = ({ onNext }) => (
  <div style={{ maxWidth: 500, margin: "0 auto" }}>
    <div style={{ textAlign: "center", padding: "8px 0 20px" }}>
      <Wordmark size={40} />
      <p style={{ fontSize: 16, fontWeight: 600, color: C.offBlack, margin: "10px 0 6px", fontFamily: "Georgia, serif" }}>
        Tell dobbı* about yourself
      </p>
      <p style={{ fontSize: 12, color: C.midGrey, lineHeight: 1.5 }}>
        The more context you give, the more precisely dobbı* can enhance your degree.
      </p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
      <div>
        <Label>University</Label>
        <FilledField check>Ohio State University</FilledField>
      </div>
      <div>
        <Label>Degree</Label>
        <FilledField check>BA History, Year 2</FilledField>
      </div>
      <div>
        <Label>Career aspirations <Hint>roles you're aiming for</Hint></Label>
        <div style={{ background: C.sageMist, borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
            <SkillTag>Policy Analyst</SkillTag>
            <SkillTag>Data Journalist</SkillTag>
            <SkillTag>Research Consultant</SkillTag>
          </div>
          <div style={{ fontSize: 11, color: C.midGrey }}>+ 2 more added</div>
        </div>
      </div>
      <div>
        <Label>Incoming skills & certifications</Label>
        <div style={{ background: C.sageMist, borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            <SkillTag>Advanced Excel</SkillTag>
            <SkillTag>Tableau (basic)</SkillTag>
            <SkillTag>ArcGIS (intro)</SkillTag>
          </div>
        </div>
      </div>
      <div>
        <Label>Weekly time commitment</Label>
        <div style={{
          background: C.sageMist, borderRadius: 8, padding: "10px 14px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.fern, fontFamily: "Georgia, serif" }}>4 hrs</div>
            <div style={{ fontSize: 11, color: C.midGrey }}>per week</div>
          </div>
          <div style={{ fontSize: 11, color: C.fern, fontWeight: 600, background: C.white, borderRadius: 20, padding: "4px 10px" }}>Balanced</div>
        </div>
      </div>
    </div>

    <Card style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.offBlack }}>Baseline employability score</div>
        <div style={{ fontSize: 11, color: C.midGrey }}>Before dobbı*</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontSize: 42, fontWeight: 700, fontFamily: "Georgia, serif", color: C.fern, lineHeight: 1 }}>5.2</div>
          <div style={{ fontSize: 9, color: C.midGrey, letterSpacing: "0.04em", textTransform: "uppercase" }}>out of 10</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: C.midGrey, marginBottom: 8, lineHeight: 1.5 }}>
            Strong academic profile, but gaps in technical skills employers in your target roles look for.
          </div>
          <ScoreBar label="Technical skills" val="3.8/10" pct={38} color={C.midGrey} />
          <ScoreBar label="Academic depth" val="7.4/10" pct={74} color={C.fern} />
          <ScoreBar label="Communication" val="6.8/10" pct={68} color={C.fern} />
          <ScoreBar label="Data & analysis" val="4.2/10" pct={42} color={C.midGrey} />
        </div>
      </div>
      <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.sageMist}` }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: C.offBlack, marginBottom: 6 }}>dobbı* focus areas</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          <FocusTag bg="#FEF3E2" color="#A05C00">Data tools & Python</FocusTag>
          <FocusTag bg="#EAF3DE" color={C.fern}>Policy writing</FocusTag>
          <FocusTag bg={C.lavender} color={C.lavMid}>Research methodology</FocusTag>
          <FocusTag bg="#FEF3E2" color="#A05C00">Quantitative analysis</FocusTag>
        </div>
      </div>
    </Card>

    <Button onClick={onNext}>Upload Semester 1 schedule →</Button>
  </div>
);

const Label = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 600, color: C.midGrey, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 5 }}>{children}</div>
);
const Hint = ({ children }) => (
  <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 10, color: C.midGrey }}> — {children}</span>
);
const FilledField = ({ children, check }) => (
  <div style={{
    padding: "10px 12px", borderRadius: 8, background: C.sageMist,
    display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13, color: C.offBlack,
  }}>
    <span>{children}</span>
    {check && <span style={{ color: C.fern }}>✓</span>}
  </div>
);
const SkillTag = ({ children }) => (
  <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: 6, fontSize: 10, background: C.white, color: C.fern }}>{children}</span>
);
const FocusTag = ({ children, bg, color }) => (
  <span style={{ padding: "4px 9px", borderRadius: 6, fontSize: 10, fontWeight: 600, background: bg, color }}>{children}</span>
);
const ScoreBar = ({ label, val, pct, color }) => (
  <div style={{ marginBottom: 5 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
      <span style={{ fontSize: 10, color: C.offBlack }}>{label}</span>
      <span style={{ fontSize: 10, fontWeight: 600, color }}>{val}</span>
    </div>
    <ProgressBar pct={pct} color={color === C.midGrey ? C.lightGrey : C.green} height={4} />
  </div>
);
const Button = ({ children, onClick, disabled, variant = "primary" }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width: "100%", padding: 13, borderRadius: 9, cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 14, fontWeight: 600, letterSpacing: "0.01em",
    border: variant === "secondary" ? `1px solid ${C.lightGrey}` : "none",
    background: variant === "secondary" ? C.white : (disabled ? C.lightGrey : C.fern),
    color: variant === "secondary" ? C.offBlack : C.white,
  }}>{children}</button>
);

// ── SCREEN 2: Upload Schedule ─────────────────────────────────────────
const ScheduleScreen = ({ onNext }) => {
  const [uploaded, setUploaded] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setAnalysing(true);
    setTimeout(() => setAnalysing(false), 1800);
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: C.offBlack, margin: "0 0 5px", fontFamily: "Georgia, serif" }}>
        Upload your semester schedule
      </h2>
      <p style={{ fontSize: 12, color: C.midGrey, margin: "0 0 16px" }}>
        dobbı* will analyse your courses against your career profile and identify exactly where to enhance.
      </p>

      <Card style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%", background: C.softSage,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: C.fern, flexShrink: 0,
        }}>SM</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.offBlack }}>Sarah Mitchell</div>
          <div style={{ fontSize: 11, color: C.midGrey }}>BA History · Ohio State · Policy Analyst / Data Journalist</div>
        </div>
      </Card>

      {!uploaded ? (
        <div onClick={handleUpload} style={{
          border: `2px dashed ${C.lightGrey}`, borderRadius: 10, padding: "32px 20px",
          textAlign: "center", cursor: "pointer", marginBottom: 14, background: C.warmWhite,
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📄</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.offBlack, marginBottom: 4 }}>Drop your semester schedule here</div>
          <div style={{ fontSize: 11, color: C.midGrey, marginBottom: 14 }}>PDF, image, or plain text</div>
          <span style={{ display: "inline-block", padding: "7px 18px", borderRadius: 7, background: C.sageMist, color: C.fern, fontSize: 12, fontWeight: 600 }}>Choose file</span>
        </div>
      ) : (
        <Card style={{ marginBottom: 14 }}>
          {analysing ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.offBlack, marginBottom: 3 }}>Analysing against your career profile...</div>
              <div style={{ fontSize: 11, color: C.midGrey, marginBottom: 10 }}>Identifying skill gaps and enhancement opportunities</div>
              <ProgressBar pct={75} />
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <span>✅</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.fern }}>Semester 1 uploaded — Autumn 2024</span>
              </div>
              <ScheduleRow name="Modern European History" tag="Core" tagColor={C.midGrey} />
              <ScheduleRow name="Research Methods in History" tag="Core" tagColor={C.midGrey} />
              <ScheduleRow name="Economic History of the US" tag="strong fit" tagColor={C.fern} dotColor={C.fern} />
              <ScheduleRow name="Open elective (unassigned)" tag="opportunity" tagColor="#A05C00" tagBg="#FEF3E2" dotColor={C.midGrey} last />
            </div>
          )}
        </Card>
      )}

      {!analysing && (
        <Button onClick={onNext} disabled={!uploaded}>
          {uploaded ? "See my Semester 1 plan →" : "Analyse my schedule to continue"}
        </Button>
      )}
    </div>
  );
};

const ScheduleRow = ({ name, tag, tagColor, tagBg, dotColor = C.green, last }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: last ? "none" : `1px solid ${C.sageMist}` }}>
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
    <span style={{ fontSize: 11, color: C.offBlack, flex: 1 }}>{name}</span>
    <span style={{ fontSize: 10, fontWeight: tagBg ? 600 : 400, color: tagColor, background: tagBg, padding: tagBg ? "2px 7px" : 0, borderRadius: tagBg ? 5 : 0 }}>{tag}</span>
  </div>
);

// ── SCREEN 3: Free Plan ───────────────────────────────────────────────
const FreePlanScreen = ({ onPremium, onSkip }) => (
  <div style={{ maxWidth: 480, margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: C.offBlack, margin: 0, fontFamily: "Georgia, serif" }}>Your Semester 1 plan</h2>
      <Badge>Free tier</Badge>
    </div>

    <Card style={{ marginBottom: 12, padding: "12px 14px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.offBlack, marginBottom: 8 }}>Gap analysis — Semester 1</div>
      <GapRow type="warn" title="Technical skills gap" desc="No data or programming exposure this semester. Policy Analyst roles require SQL, Python, or R proficiency." />
      <GapRow type="warn" title="Quantitative analysis gap" desc="Economic History is a good foundation but lacks applied statistical methods used in policy and journalism contexts." />
      <GapRow type="ok" title="Strong area — research writing" desc="Research Methods course directly builds the academic writing skills employers in policy roles value." last />
    </Card>

    <div style={{ marginBottom: 12 }}>
      <SectionLabel>Recommended complement curriculum <Hint>open web, free</Hint></SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <ResourceChip icon="🐍" name="Intro to Python for Data Analysis" src="MIT OpenCourseWare · ~6 hrs" />
        <ResourceChip icon="📊" name="Statistics for Social Scientists" src="YouTube · Khan Academy · ~4 hrs" />
        <ResourceChip icon="✍️" name="Policy Writing Fundamentals" src="arXiv readings + Yale Open Courses · ~3 hrs" />
      </div>
    </div>

    <div style={{ marginBottom: 16 }}>
      <SectionLabel>Suggested paid additions <Hint>optional upgrades</Hint></SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <PaidChip name="Google Data Analytics Certificate" src="Coursera · $49 · industry-recognised" />
        <PaidChip name="Python for Everybody — Specialisation" src="Coursera · $79 · 4-course series" />
      </div>
    </div>

    <div style={{ background: C.offBlack, borderRadius: 10, padding: "14px 16px", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span>🔒</span>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.white }}>Want better results? Upgrade to Premium · $19.99/mo</div>
      </div>
      <div style={{ fontSize: 11, color: "#A8B8D8", marginBottom: 10, lineHeight: 1.5 }}>
        Premium unlocks elective optimisation, your university's licensed resources (Bloomberg, JSTOR, Coursera for Campus), and a higher quality curriculum. From $19.99/month.
      </div>
      <button onClick={onPremium} style={{
        width: "100%", padding: 10, borderRadius: 8, border: "none",
        background: C.fern, color: C.white, fontSize: 13, fontWeight: 600, cursor: "pointer",
      }}>See your Premium plan →</button>
    </div>

    <Button variant="secondary" onClick={onSkip}>Continue with free plan →</Button>
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 10, fontWeight: 600, color: C.midGrey, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 7 }}>{children}</div>
);
const GapRow = ({ type, title, desc, last }) => (
  <div style={{
    background: type === "warn" ? "#FEF3E2" : "#EAF3DE", borderRadius: 7, padding: "8px 10px",
    display: "flex", alignItems: "flex-start", gap: 8, marginBottom: last ? 0 : 7,
  }}>
    <span style={{ fontSize: 13, marginTop: 1 }}>{type === "warn" ? "⚠️" : "✅"}</span>
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: type === "warn" ? "#A05C00" : C.fern }}>{title}</div>
      <div style={{ fontSize: 10, color: type === "warn" ? "#7A4400" : "#2a5a40", marginTop: 2 }}>{desc}</div>
    </div>
  </div>
);
const ResourceChip = ({ icon, name, src, premium }) => (
  <div style={{
    background: premium ? C.lavender : C.sageMist, border: premium ? `1px solid ${C.lavMid}` : "none",
    borderRadius: 8, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8,
  }}>
    <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.offBlack }}>{name}</div>
      <div style={{ fontSize: 10, color: premium ? C.lavMid : C.midGrey }}>{src}</div>
    </div>
    <Badge bg={premium ? C.lavMid : C.sageMist} color={premium ? C.white : C.fern} style={{ flexShrink: 0 }}>
      {premium ? "Unlocked" : "Free"}
    </Badge>
  </div>
);
const PaidChip = ({ name, src }) => (
  <div style={{
    background: C.white, border: `1px solid ${C.lightGrey}`, borderRadius: 9,
    padding: "10px 12px", display: "flex", alignItems: "center", gap: 10,
  }}>
    <span style={{ fontSize: 18, flexShrink: 0 }}>🎓</span>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.offBlack }}>{name}</div>
      <div style={{ fontSize: 10, color: C.midGrey }}>{src}</div>
    </div>
    <span style={{ fontSize: 10, fontWeight: 600, color: C.lavMid, background: C.lavender, padding: "3px 8px", borderRadius: 5, flexShrink: 0 }}>+ Add</span>
  </div>
);

// ── SCREEN 4: Premium Plan ────────────────────────────────────────────
const PremiumPlanScreen = ({ onNext }) => (
  <div style={{ maxWidth: 480, margin: "0 auto" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: C.offBlack, margin: 0, fontFamily: "Georgia, serif" }}>Your Premium Semester 1 plan</h2>
      <Badge bg={C.lavender} color={C.lavMid}>Premium</Badge>
    </div>

    <div style={{
      background: "linear-gradient(135deg, #3D7A58 0%, #2a5a40 100%)", borderRadius: 10,
      padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 12,
    }}>
      <span style={{ fontSize: 24 }}>🔓</span>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.white, marginBottom: 2 }}>University resources unlocked</div>
        <div style={{ fontSize: 11, color: C.softSage }}>Bloomberg Terminal · JSTOR · LexisNexis · Coursera for Campus — included in your tuition</div>
      </div>
    </div>

    <Card style={{ marginBottom: 12, padding: "12px 14px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: C.offBlack, marginBottom: 8 }}>
        Elective optimisation <span style={{ fontWeight: 400, color: C.midGrey, fontSize: 10 }}>— Degree Strategist</span>
      </div>
      <GapRow type="warn" title="Replace open elective" desc={<>dobbı* recommends <strong>Statistics for Social Sciences</strong> — fills your quantitative gap and is cross-listed with your major.</>} />
      <GapRow type="ok" title="Remaining courses confirmed" desc="Modern European History, Research Methods, and Economic History are all well aligned with your career targets." last />
    </Card>

    <div style={{ marginBottom: 12 }}>
      <SectionLabel>Premium complement curriculum</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <ResourceChip icon="🏦" name="Bloomberg Terminal — Economic Data Analysis" src="Ohio State licensed · ties to Economic History course" premium />
        <ResourceChip icon="📚" name="JSTOR — Policy Research Methodology" src="Ohio State licensed · curated reading list" premium />
        <ResourceChip icon="🐍" name="Python for Data Analysis — Coursera for Campus" src="Ohio State licensed · replaces open-web version" />
      </div>
    </div>

    <div style={{ marginBottom: 16 }}>
      <SectionLabel>Suggested paid additions</SectionLabel>
      <PaidChip name="Google Data Analytics Certificate" src="Coursera · $49 · employer-recognised credential" />
    </div>

    <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.offBlack }}>Projected score after Semester 1</div>
        <div style={{ fontSize: 11, color: C.midGrey }}>If you complete this plan</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.fern, fontFamily: "Georgia, serif", lineHeight: 1 }}>6.8</div>
        <div style={{ fontSize: 9, color: C.midGrey }}>vs 5.2 baseline</div>
      </div>
    </Card>

    <Button onClick={onNext}>See my dashboard →</Button>
  </div>
);

// ── SCREEN 5: Dashboard ───────────────────────────────────────────────
const DashboardScreen = () => {
  const [tab, setTab] = useState(0);

  const sems = [
    {
      period: "Autumn 2024", score: "8.4",
      classes: [
        { n: "Modern European History", g: "A", r: false },
        { n: "Research Methods", g: "A-", r: false },
        { n: "Economic History of the US", g: "B+", r: false },
        { n: "Statistics for Social Sciences", g: "A-", r: true },
      ],
      mods: [
        { n: "Python for Data Analysis", p: 100, d: true },
        { n: "Stats for Social Scientists", p: 100, d: true },
        { n: "Policy Writing Fundamentals", p: 100, d: true },
        { n: "Google Data Analytics cert.", p: 78, d: true },
      ],
    },
    {
      period: "Spring 2025", score: "7.6",
      classes: [
        { n: "Cold War in Global Context", g: "A-", r: false },
        { n: "Digital Humanities", g: "A", r: true },
        { n: "Political Economy", g: "B+", r: false },
        { n: "19th Century American Lit.", g: "B", r: false },
      ],
      mods: [
        { n: "Tableau for data storytelling", p: 100, d: true },
        { n: "JSTOR research deep-dive", p: 100, d: true },
        { n: "Intro to policy writing", p: 65, d: false },
        { n: "Google Data Analytics cert.", p: 40, d: false },
      ],
    },
  ];
  const s = sems[tab];

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: C.offBlack, margin: 0, fontFamily: "Georgia, serif" }}>Your dashboard</h2>
        <Badge bg={C.lavender} color={C.lavMid}>Premium</Badge>
      </div>

      <Card style={{ marginBottom: 12, padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.offBlack }}>Overall employability score</div>
            <div style={{ fontSize: 11, color: C.midGrey }}>Across 2 semesters with dobbı*</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.fern, fontFamily: "Georgia, serif", lineHeight: 1 }}>7.8</div>
            <div style={{ fontSize: 9, color: C.midGrey }}>out of 10</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden", background: C.sageMist }}>
            <div style={{ width: "52%", height: "100%", background: C.midGrey, borderRadius: 4 }} />
          </div>
          <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden", background: C.sageMist }}>
            <div style={{ width: "68%", height: "100%", background: C.green, borderRadius: 4 }} />
          </div>
          <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden", background: C.sageMist }}>
            <div style={{ width: "78%", height: "100%", background: C.fern, borderRadius: 4 }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ScoreMilestone label="Baseline" val="5.2" color={C.midGrey} />
          <ScoreMilestone label="Semester 1" val="6.8" color={C.fern} />
          <ScoreMilestone label="Semester 2" val="7.8" color={C.fern} />
        </div>
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${C.sageMist}`, fontSize: 11, color: C.midGrey, lineHeight: 1.5 }}>
          📈 Technical skills improved from 3.8 to 7.2. Data journalism and policy analysis roles now within strong reach by graduation.
        </div>
      </Card>

      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {sems.map((sm, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: "5px 12px", borderRadius: 18, cursor: "pointer",
            border: `1px solid ${tab === i ? C.fern : C.lightGrey}`,
            background: tab === i ? C.fern : C.white,
            color: tab === i ? C.white : C.midGrey,
            fontSize: 11, fontWeight: tab === i ? 600 : 400,
          }}>{`Semester ${i + 1}`}</button>
        ))}
        <div style={{ padding: "5px 12px", borderRadius: 18, border: `1px solid ${C.green}`, color: C.fern, fontSize: 11 }}>
          Semester 3 (next)
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.offBlack }}>University classes</div>
              <div style={{ fontSize: 10, color: C.midGrey }}>{s.period}</div>
            </div>
            <ScoreRing score={s.score} size={50} />
          </div>
          {s.classes.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", borderTop: i > 0 ? `1px solid ${C.sageMist}` : "none" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: c.r ? C.fern : C.green, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: C.offBlack, flex: 1 }}>{c.n}</span>
              {c.r ? <Badge style={{ fontSize: 9 }}>rec.</Badge> : <span style={{ fontSize: 10, fontWeight: 700, color: C.fern }}>{c.g}</span>}
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.offBlack, marginBottom: 8 }}>Complement modules</div>
          {s.mods.map((m, i) => (
            <div key={i} style={{ padding: "5px 0", borderTop: i > 0 ? `1px solid ${C.sageMist}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: C.offBlack }}>{m.n}</span>
                <span style={{ fontSize: 10, fontWeight: 600, color: m.d ? C.fern : C.lavMid }}>{m.p}%</span>
              </div>
              <ProgressBar pct={m.p} color={m.d ? C.green : C.lavMid} height={3} />
            </div>
          ))}
        </Card>
      </div>

      <Card style={{ marginBottom: 12, padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.offBlack }}>Semester 3 — dobbı* optimised</div>
            <div style={{ fontSize: 10, color: C.midGrey }}>Autumn 2025 · projected score 9.2</div>
          </div>
          <Badge style={{ fontSize: 9 }}>Next up</Badge>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <NextCourseChip name="History of Tech & Society" type="Required" />
          <NextCourseChip name="Data Science for Humanities" type="Elective" rec />
          <NextCourseChip name="Public Policy & Governance" type="Elective" rec />
          <NextCourseChip name="Archival Research Practicum" type="Required" />
        </div>
      </Card>

      <div style={{ background: C.offBlack, borderRadius: 11, padding: "16px 18px", textAlign: "center" }}>
        <Wordmark size={22} dark={false} />
        <p style={{ fontSize: 12, color: "#A8B8D8", margin: "8px 0 12px", lineHeight: 1.6 }}>
          Every semester dobbı* knows Sarah better. By graduation she will have a certified 9.2/10 Career Readiness Score — and the skills to back it up.
        </p>
        <a href="https://dobbi.online" target="_blank" rel="noreferrer" style={{
          display: "inline-block", padding: "10px 22px", borderRadius: 7,
          background: C.green, color: C.white, fontSize: 12, fontWeight: 600, textDecoration: "none",
        }}>Get early access at dobbi.online</a>
      </div>
    </div>
  );
};

const ScoreMilestone = ({ label, val, color }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: 10, fontWeight: 600, color }}>{label}</div>
    <div style={{ fontSize: 11, fontWeight: 700, color }}>{val}</div>
  </div>
);
const NextCourseChip = ({ name, type, rec }) => (
  <div style={{
    background: rec ? "#F0F7F3" : C.sageMist, border: rec ? `1px solid ${C.green}` : "none",
    borderRadius: 7, padding: "8px 10px",
  }}>
    <div style={{ fontSize: 10, fontWeight: 600, color: C.offBlack }}>{name}</div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ fontSize: 9, color: C.midGrey }}>{type}</span>
      {rec && <Badge style={{ fontSize: 8, padding: "1px 5px" }}>rec.</Badge>}
    </div>
  </div>
);

// ── Shell / layout ────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const goPremium = () => setStep(3);
  const skipToDashboard = () => setStep(4);

  const screens = [
    <SetupScreen onNext={next} />,
    <ScheduleScreen onNext={next} />,
    <FreePlanScreen onPremium={goPremium} onSkip={skipToDashboard} />,
    <PremiumPlanScreen onNext={next} />,
    <DashboardScreen />,
  ];

  return (
    <div style={{
      minHeight: "100vh", background: C.warmWhite,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: C.offBlack,
    }}>
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: C.warmWhite, borderBottom: `1px solid ${C.lightGrey}`,
        padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Wordmark size={20} />
        <span style={{ fontSize: 10, color: C.midGrey }}>{step + 1} of {steps.length}</span>
      </div>

      <div style={{ padding: "20px 20px 70px", maxWidth: 640, margin: "0 auto" }}>
        <StepNav current={step} />
        {screens[step]}
      </div>

      {step > 0 && step < steps.length - 1 && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: C.warmWhite, borderTop: `1px solid ${C.lightGrey}`,
          padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <button onClick={back} style={{
            padding: "8px 18px", borderRadius: 7, border: `1px solid ${C.lightGrey}`,
            background: "transparent", color: C.midGrey, fontSize: 12, cursor: "pointer",
          }}>← Back</button>
          <div style={{ display: "flex", gap: 5 }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: i === step ? 18 : 5, height: 5, borderRadius: 3,
                background: i === step ? C.fern : i < step ? C.green : C.lightGrey,
                transition: "all 0.2s",
              }} />
            ))}
          </div>
          <div style={{ width: 70 }} />
        </div>
      )}
    </div>
  );
}

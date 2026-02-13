"use client";

import { api } from "@packages/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Building, ClipboardList, Calculator } from "lucide-react";

type Role = "landlord" | "property_manager" | "accountant";
type TeamSize = "solo" | "small_team" | "enterprise";
type ManagerStartMode = "add_property" | "get_invited" | "import_properties";

const LANDLORD_STEPS = ["role", "profile", "property", "extra", "review", "auth"] as const;
const MANAGER_STEPS = ["role", "business", "start", "permissions", "team", "review", "auth"] as const;
const ACCOUNTANT_STEPS = ["role", "profile", "controls", "review", "auth"] as const;

function createSessionId() {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem("pp_onboarding_session");
  if (existing) return existing;
  const id = window.crypto.randomUUID();
  window.localStorage.setItem("pp_onboarding_session", id);
  return id;
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-100";

const cardClass =
  "rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-8";

export default function OnboardingPage() {
  const [sessionId] = useState(createSessionId);
  const [stepIndex, setStepIndex] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [countryRegion, setCountryRegion] = useState("");
  const [managementMode, setManagementMode] = useState<"self_manage" | "has_manager">("self_manage");
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("Single-family");
  const [units, setUnits] = useState(1);
  const [tenantInput, setTenantInput] = useState("");
  const [tenants, setTenants] = useState<Array<{ name: string; email?: string }>>([]);
  const [connectBank, setConnectBank] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [propertiesManaged, setPropertiesManaged] = useState("");
  const [teamSize, setTeamSize] = useState<TeamSize>("solo");
  const [startMode, setStartMode] = useState<ManagerStartMode>("add_property");
  const [rentCollection, setRentCollection] = useState(true);
  const [maintenance, setMaintenance] = useState(true);
  const [reporting, setReporting] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "staff">("admin");
  const [invites, setInvites] = useState<Array<{ email: string; role: "admin" | "staff" }>>([]);
  const [firmName, setFirmName] = useState("");
  const [certifications, setCertifications] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [regionCoverage, setRegionCoverage] = useState("");
  const [leaseCount, setLeaseCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const draft = useQuery(api.onboarding.getDraftBySession, sessionId ? { sessionId } : "skip");
  const saveRole = useMutation(api.onboarding.saveRole);
  const saveLandlordProfile = useMutation(api.onboarding.saveLandlordProfile);
  const saveLandlordProperty = useMutation(api.onboarding.saveLandlordProperty);
  const saveLandlordExtra = useMutation(api.onboarding.saveLandlordExtra);
  const generateLeaseUploadUrl = useMutation(api.onboarding.generateLeaseUploadUrl);
  const addLeaseUpload = useMutation(api.onboarding.addLeaseUpload);
  const saveManagerBusiness = useMutation(api.onboarding.saveManagerBusiness);
  const saveManagerStartMode = useMutation(api.onboarding.saveManagerStartMode);
  const saveManagerPermissions = useMutation(api.onboarding.saveManagerPermissions);
  const saveManagerTeamInvites = useMutation(api.onboarding.saveManagerTeamInvites);
  const saveAccountantProfile = useMutation(api.onboarding.saveAccountantProfile);
  const saveAccountantControls = useMutation(api.onboarding.saveAccountantControls);

  useEffect(() => {
    if (!draft) return;
    if (draft.role && !role) {
      setRole(draft.role);
      setStepIndex(1);
    }
    if (draft.landlordProfile) {
      setName((v) => v || draft.landlordProfile!.name);
      setCountryRegion((v) => v || draft.landlordProfile!.countryRegion);
      setManagementMode(draft.landlordProfile.managementMode);
    }
    if (draft.landlordProperty) {
      setPropertyName((v) => v || draft.landlordProperty!.propertyName);
      setAddress((v) => v || draft.landlordProperty!.address);
      setPropertyType((v) => v || draft.landlordProperty!.propertyType);
      setUnits((v) => (v > 1 ? v : draft.landlordProperty!.units));
    }
    if (draft.landlordExtra) {
      setTenants((v) => (v.length > 0 ? v : draft.landlordExtra!.tenants));
      setConnectBank(draft.landlordExtra.connectBank);
      setLeaseCount(draft.landlordExtra.leaseStorageIds.length);
    }
    if (draft.managerBusiness) {
      setCompanyName((v) => v || draft.managerBusiness!.companyName);
      setPropertiesManaged((v) => v || draft.managerBusiness!.propertiesManaged);
      setTeamSize(draft.managerBusiness.teamSize);
    }
    if (draft.managerStartMode) setStartMode(draft.managerStartMode);
    if (draft.managerPermissions) {
      setRentCollection(draft.managerPermissions.rentCollection);
      setMaintenance(draft.managerPermissions.maintenance);
      setReporting(draft.managerPermissions.reporting);
    }
    if (draft.managerTeamInvites) {
      setInvites((v) => (v.length > 0 ? v : draft.managerTeamInvites!));
    }
    if (draft.accountantProfile) {
      setName((v) => v || draft.accountantProfile!.name);
      setFirmName((v) => v || draft.accountantProfile!.firmName);
      setRegionCoverage((v) => v || draft.accountantProfile!.regionCoverage);
      setCertifications((v) => v || (draft.accountantProfile!.certifications ?? ""));
    }
    if (draft.accountantControls) {
      setFocusAreas((v) => (v.length > 0 ? v : draft.accountantControls!.focusAreas));
    }
  }, [draft, role]);

  const steps =
    role === "landlord"
      ? LANDLORD_STEPS
      : role === "property_manager"
        ? MANAGER_STEPS
        : role === "accountant"
          ? ACCOUNTANT_STEPS
          : LANDLORD_STEPS;
  const step = steps[stepIndex];
  const progressTotal = steps.length - 1;
  const progressStep = Math.min(stepIndex + 1, progressTotal);

  const next = async () => {
    if (!sessionId) return;
    if (step === "review" && !acceptedTerms) return;
    setSaving(true);
    try {
      if (role === "landlord") {
        if (step === "profile") {
          await saveLandlordProfile({ sessionId, name, countryRegion, managementMode });
        }
        if (step === "property") {
          await saveLandlordProperty({ sessionId, propertyName, address, propertyType, units: Math.max(1, units) });
        }
        if (step === "extra") {
          await saveLandlordExtra({ sessionId, tenants, connectBank });
        }
      }
      if (role === "property_manager") {
        if (step === "business") {
          await saveManagerBusiness({ sessionId, companyName, propertiesManaged, teamSize });
        }
        if (step === "start") {
          await saveManagerStartMode({ sessionId, managerStartMode: startMode });
        }
        if (step === "permissions") {
          await saveManagerPermissions({ sessionId, rentCollection, maintenance, reporting });
        }
        if (step === "team") {
          await saveManagerTeamInvites({ sessionId, invites });
        }
      }
      if (role === "accountant") {
        if (step === "profile") {
          await saveAccountantProfile({ sessionId, name, firmName, regionCoverage, certifications });
        }
        if (step === "controls") {
          await saveAccountantControls({ sessionId, focusAreas });
        }
      }
      setStepIndex((v) => v + 1);
    } finally {
      setSaving(false);
    }
  };

  const handleSelectRole = async (selected: Role) => {
    if (!sessionId) return;
    setRole(selected);
    await saveRole({ sessionId, role: selected });
    setStepIndex(1);
  };

  const handleLeaseUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !sessionId) return;
    setSaving(true);
    try {
      for (const file of Array.from(files)) {
        const postUrl = await generateLeaseUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type || "application/octet-stream" },
          body: file,
        });
        const { storageId } = await result.json();
        await addLeaseUpload({ sessionId, storageId });
      }
      setLeaseCount((v) => v + files.length);
    } finally {
      setSaving(false);
    }
  };

  const reviewFields = useMemo(() => {
    if (role === "landlord") {
      return [
        { label: "Name", value: name || "Not provided" },
        { label: "Region", value: countryRegion || "Not provided" },
        { label: "Management", value: managementMode === "self_manage" ? "Self-managed" : "Managed" },
        { label: "Property", value: propertyName || "Not provided" },
        { label: "Address", value: address || "Not provided" },
        { label: "Units", value: String(units || 1) },
        { label: "Tenants", value: tenants.length ? `${tenants.length} added` : "None" },
        { label: "Lease uploads", value: `${leaseCount} files` },
      ];
    }
    if (role === "property_manager") {
      return [
        { label: "Company", value: companyName || "Not provided" },
        { label: "Properties", value: propertiesManaged || "Not provided" },
        { label: "Team size", value: teamSize.replace("_", " ") },
        { label: "Start mode", value: startMode.replace("_", " ") },
        { label: "Permissions", value: `${rentCollection ? "Rent" : ""} ${maintenance ? "Maintenance" : ""} ${reporting ? "Reporting" : ""}`.trim() || "None" },
        { label: "Invites", value: invites.length ? `${invites.length} queued` : "None" },
      ];
    }
    return [
      { label: "Name", value: name || "Not provided" },
      { label: "Firm", value: firmName || "Not provided" },
      { label: "Region", value: regionCoverage || "Not provided" },
      { label: "Certifications", value: certifications || "Not provided" },
      { label: "Focus areas", value: focusAreas.length ? focusAreas.join(", ") : "None" },
    ];
  }, [address, certifications, companyName, countryRegion, firmName, focusAreas, invites.length, leaseCount, maintenance, managementMode, name, propertiesManaged, rentCollection, reporting, role, startMode, teamSize, tenants.length, units, propertyName, regionCoverage]);

  return (
    <main className="min-h-screen bg-[#f7f5f1]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <img src="/images/prople-icon.svg" alt="Prople" className="h-10 w-10 rounded-2xl shadow-sm" />
            <span className="font-display text-3xl font-bold text-slate-900">Prople</span>
          </div>
          <div className="flex w-full max-w-xl items-center gap-3">
            {Array.from({ length: steps.length }).map((_, idx) => (
              <span
                key={idx}
                className={`h-2 flex-1 rounded-full ${idx <= stepIndex ? "bg-amber-700" : "bg-slate-200"}`}
              />
            ))}
          </div>
        </div>

        <div className={cardClass}>
          {step === "role" ? (
            <section className="text-center">
              <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">How will you be using Prople?</h1>
              <p className="mt-3 text-sm text-slate-600">
                Select your role to get a personalized onboarding experience.
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[
                  {
                    id: "landlord" as const,
                    title: "Landlord / Owner",
                    description: "I own properties and want to track portfolio performance, ROI, and financial health.",
                    icon: Building,
                  },
                  {
                    id: "property_manager" as const,
                    title: "Property Manager",
                    description: "I manage properties and need to handle tenants, maintenance, and daily operations.",
                    icon: ClipboardList,
                  },
                  {
                    id: "accountant" as const,
                    title: "Accountant",
                    description: "I handle financial records, auditing, and tax compliance for property portfolios.",
                    icon: Calculator,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectRole(item.id)}
                    className="card-interactive rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-lg"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {role === "landlord" && step === "profile" ? (
            <section className="grid gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Complete your profile</h2>
                <p className="mt-2 text-sm text-slate-600">Tell us a bit about yourself so we can personalize your experience.</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-900">Full name *</label>
                  <input className={inputClass} placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900">Country / region *</label>
                  <input className={inputClass} placeholder="United Kingdom" value={countryRegion} onChange={(e) => setCountryRegion(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-3">
                <p className="text-sm font-semibold text-slate-900">Do you self-manage or use a property manager?</p>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="radio" checked={managementMode === "self_manage"} onChange={() => setManagementMode("self_manage")} />
                  Self-manage
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="radio" checked={managementMode === "has_manager"} onChange={() => setManagementMode("has_manager")} />
                  I have a manager (invite later)
                </label>
              </div>
            </section>
          ) : null}

          {role === "landlord" && step === "property" ? (
            <section className="grid gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Add your first property</h2>
                <p className="mt-2 text-sm text-slate-600">Let’s get your portfolio started.</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-900">Property name</label>
                  <input className={inputClass} placeholder="Lakeside House" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900">Property type</label>
                  <input className={inputClass} placeholder="Single-family" value={propertyType} onChange={(e) => setPropertyType(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-slate-900">Address</label>
                  <input className={inputClass} placeholder="221B Baker Street, London" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900">Number of units</label>
                  <input className={inputClass} type="number" min={1} value={units} onChange={(e) => setUnits(Number(e.target.value))} />
                </div>
              </div>
            </section>
          ) : null}

          {role === "landlord" && step === "extra" ? (
            <section className="grid gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Extra setup</h2>
                <p className="mt-2 text-sm text-slate-600">Optional steps to save time later.</p>
              </div>
              <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Upload lease(s)</p>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 rounded-2xl bg-black px-4 py-2 text-xs font-semibold text-white">
                    Upload files
                    <input
                      type="file"
                      multiple
                      className="sr-only"
                      onChange={(e) => handleLeaseUpload(e.target.files)}
                    />
                  </label>
                  <span className="text-xs text-slate-500">PDF, DOCX, or images</span>
                </div>
                <p className="text-xs text-slate-500">{leaseCount} file(s) uploaded</p>
              </div>
              <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Add tenants</p>
                <div className="flex flex-wrap gap-2">
                  <input
                    className="min-w-[220px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm"
                    placeholder="Name or email"
                    value={tenantInput}
                    onChange={(e) => setTenantInput(e.target.value)}
                  />
                  <button
                    className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white"
                    onClick={() => {
                      if (!tenantInput.trim()) return;
                      setTenants((v) => [...v, { name: tenantInput.trim() }]);
                      setTenantInput("");
                    }}
                  >
                    Add
                  </button>
                </div>
                {tenants.length > 0 ? <p className="text-xs text-slate-600">{tenants.length} tenant(s) added</p> : null}
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input type="checkbox" checked={connectBank} onChange={(e) => setConnectBank(e.target.checked)} />
                Connect bank (if payments exist)
              </label>
            </section>
          ) : null}

          {role === "property_manager" && step === "business" ? (
            <section className="grid gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Complete your profile</h2>
                <p className="mt-2 text-sm text-slate-600">Tell us about your business.</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-900">Company name *</label>
                  <input className={inputClass} placeholder="Acme Properties" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900">Properties managed</label>
                  <input className={inputClass} placeholder="20" value={propertiesManaged} onChange={(e) => setPropertiesManaged(e.target.value)} />
                </div>
              </div>
              <div className="grid gap-3">
                <p className="text-sm font-semibold text-slate-900">Team size</p>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="radio" checked={teamSize === "solo"} onChange={() => setTeamSize("solo")} />Solo
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="radio" checked={teamSize === "small_team"} onChange={() => setTeamSize("small_team")} />Small team
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="radio" checked={teamSize === "enterprise"} onChange={() => setTeamSize("enterprise")} />Enterprise
                </label>
              </div>
            </section>
          ) : null}

          {role === "property_manager" && step === "start" ? (
            <section className="grid gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">How do you want to start?</h2>
                <p className="mt-2 text-sm text-slate-600">Choose the fastest setup path.</p>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" checked={startMode === "add_property"} onChange={() => setStartMode("add_property")} />Add a property
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" checked={startMode === "get_invited"} onChange={() => setStartMode("get_invited")} />Get invited by a landlord
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="radio" checked={startMode === "import_properties"} onChange={() => setStartMode("import_properties")} />Import properties (CSV / PMS later)
              </label>
            </section>
          ) : null}

          {role === "property_manager" && step === "permissions" ? (
            <section className="grid gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Permissions setup</h2>
                <p className="mt-2 text-sm text-slate-600">Select what your team will manage.</p>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={rentCollection} onChange={(e) => setRentCollection(e.target.checked)} />Rent collection
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={maintenance} onChange={(e) => setMaintenance(e.target.checked)} />Maintenance
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={reporting} onChange={(e) => setReporting(e.target.checked)} />Reporting
              </label>
            </section>
          ) : null}

          {role === "property_manager" && step === "team" ? (
            <section className="grid gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Invite your team</h2>
                <p className="mt-2 text-sm text-slate-600">Optional, you can do this later.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <input
                  className="min-w-[220px] flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm"
                  placeholder="Email invite"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <select
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as "admin" | "staff")}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                </select>
                <button
                  className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white"
                  onClick={() => {
                    if (!inviteEmail.trim()) return;
                    setInvites((v) => [...v, { email: inviteEmail.trim(), role: inviteRole }]);
                    setInviteEmail("");
                  }}
                >
                  Add
                </button>
              </div>
              {invites.length > 0 ? <p className="text-xs text-slate-600">{invites.length} invite(s) queued</p> : null}
            </section>
          ) : null}

          {role === "accountant" && step === "profile" ? (
            <section className="grid gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Complete your profile</h2>
                <p className="mt-2 text-sm text-slate-600">Tell us about your practice.</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-900">Full name *</label>
                  <input className={inputClass} placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900">Firm name</label>
                  <input className={inputClass} placeholder="Smith & Co" value={firmName} onChange={(e) => setFirmName(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900">Region coverage</label>
                  <input className={inputClass} placeholder="UK-wide" value={regionCoverage} onChange={(e) => setRegionCoverage(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-900">Certifications</label>
                  <input className={inputClass} placeholder="ACA, ACCA" value={certifications} onChange={(e) => setCertifications(e.target.value)} />
                </div>
              </div>
            </section>
          ) : null}

          {role === "accountant" && step === "controls" ? (
            <section className="grid gap-5">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Controls & focus</h2>
                <p className="mt-2 text-sm text-slate-600">Choose what you need in the read-only ledger.</p>
              </div>
              <div className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                {[
                  { key: "taxes", label: "Taxes & Insurance" },
                  { key: "utilities", label: "Utilities" },
                  { key: "repairs", label: "Repairs & CapEx" },
                  { key: "rent", label: "Rent Roll & Delinquencies" },
                  { key: "audit", label: "Audit trail & exports" },
                ].map((item) => (
                  <label key={item.key} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <input
                      type="checkbox"
                      checked={focusAreas.includes(item.key)}
                      onChange={(e) =>
                        setFocusAreas((current) =>
                          e.target.checked ? Array.from(new Set([...current, item.key])) : current.filter((f) => f !== item.key),
                        )
                      }
                    />
                    {item.label}
                  </label>
                ))}
              </div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Accountants in Prople are read-only by design. Owners and managers keep write access; you keep clean ledgers.
              </div>
            </section>
          ) : null}

          {step === "review" ? (
            <section className="grid gap-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900">Review your details</h2>
                <p className="mt-2 text-sm text-slate-600">Confirm the info below before creating your account.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {reviewFields.map((field) => (
                  <div key={field.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{field.label}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{field.value}</p>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <span>I agree to the Terms & Agreement.</span>
              </label>
            </section>
          ) : null}

          {step === "auth" ? (
            <section className="grid gap-5">
              <h2 className="font-display text-3xl font-bold text-slate-900">Create your account</h2>
              <p className="text-slate-600">
                {role === "landlord"
                  ? "Sign in to manage your properties."
                  : role === "accountant"
                    ? "Sign in to audit and export transactions."
                    : "Sign in to manage properties for your clients."}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white"
                  href={`/sign-up?redirect_url=${encodeURIComponent(`/onboarding/complete?session=${sessionId}`)}`}
                >
                  Create account
                </Link>
                <Link
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                  href={`/sign-in?redirect_url=${encodeURIComponent(`/onboarding/complete?session=${sessionId}`)}`}
                >
                  I already have an account
                </Link>
              </div>
            </section>
          ) : null}

          {step !== "role" && step !== "auth" ? (
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
              <button
                onClick={() => setStepIndex((v) => Math.max(0, v - 1))}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <span aria-hidden="true">←</span>
                Back
              </button>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStepIndex((v) => v + 1)}
                  className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Skip
                </button>
                <button
                  onClick={next}
                  disabled={saving || (step === "review" && !acceptedTerms)}
                  className="rounded-2xl bg-black px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Continue →"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

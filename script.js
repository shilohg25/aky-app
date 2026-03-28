const SUPABASE_URL = "https://pnadtkjdybaalnaqotiu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_lnGONrjUkuM00sgdNTS7aQ_lSxolPAd";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

alert("SCRIPT LOADED");

(function () {
  "use strict";

  const STORAGE_KEY = "aky_app_v5";

  let state = loadState();
  let currentView = "customers";
  let selectedCustomerId = null;
  let customerSearchTerm = "";
  let editingCustomerId = null;
  let editingInvoiceId = null;
  let paymentDraft = null;

  const el = mapElements();
  bindEvents();
  bootstrap();

  function mapElements() {
    return {
      loginScreen: byId("loginScreen"),
      appShell: byId("appShell"),
      loginUsername: byId("loginUsername"),
      loginPassword: byId("loginPassword"),
      loginBtn: byId("loginBtn"),
      loginMessage: byId("loginMessage"),

      changePasswordModal: byId("changePasswordModal"),
      changePasswordTitle: byId("changePasswordTitle"),
      openChangePasswordBtn: byId("openChangePasswordBtn"),
      newOwnPassword: byId("newOwnPassword"),
      confirmOwnPassword: byId("confirmOwnPassword"),
      saveOwnPasswordBtn: byId("saveOwnPasswordBtn"),

      currentUserInfo: byId("currentUserInfo"),
      navCustomers: byId("navCustomers"),
      navExecutive: byId("navExecutive"),
      navLogs: byId("navLogs"),
      navUsers: byId("navUsers"),
      logoutBtn: byId("logoutBtn"),

      customersView: byId("customersView"),
      executiveView: byId("executiveView"),
      logView: byId("logView"),
      userAdminView: byId("userAdminView"),

      openCustomerModalBtn: byId("openCustomerModalBtn"),
      customerList: byId("customerList"),
      customerSearch: byId("customerSearch"),
      customerSearchBtn: byId("customerSearchBtn"),
      customerClearSearchBtn: byId("customerClearSearchBtn"),

      welcomePanel: byId("welcomePanel"),
      customerDashboard: byId("customerDashboard"),
      customerTitle: byId("customerTitle"),
      customerMeta: byId("customerMeta"),
      customerContacts: byId("customerContacts"),
      overdueAlertBox: byId("overdueAlertBox"),
      createInvoiceBtn: byId("createInvoiceBtn"),
      makePaymentBtn: byId("makePaymentBtn"),
      editCustomerBtn: byId("editCustomerBtn"),
      deleteCustomerBtn: byId("deleteCustomerBtn"),

      sumInvoiced: byId("sumInvoiced"),
      sumCollected: byId("sumCollected"),
      sumOutstanding: byId("sumOutstanding"),
      sumOverdue: byId("sumOverdue"),

      invoiceTableBody: byId("invoiceTableBody"),
      paymentTableBody: byId("paymentTableBody"),

      customerModal: byId("customerModal"),
      customerModalTitle: byId("customerModalTitle"),
      closeCustomerModalBtn: byId("closeCustomerModalBtn"),
      customerFormName: byId("customerFormName"),
      customerFormPhone: byId("customerFormPhone"),
      customerFormEmail: byId("customerFormEmail"),
      additionalContacts: byId("additionalContacts"),
      addContactBtn: byId("addContactBtn"),
      saveCustomerBtn: byId("saveCustomerBtn"),

      invoiceModal: byId("invoiceModal"),
      invoiceModalTitle: byId("invoiceModalTitle"),
      closeInvoiceModalBtn: byId("closeInvoiceModalBtn"),
      invoiceNumber: byId("invoiceNumber"),
      invoiceDate: byId("invoiceDate"),
      poNumber: byId("poNumber"),
      referenceInfo: byId("referenceInfo"),
      lineItemsContainer: byId("lineItemsContainer"),
      addLineBtn: byId("addLineBtn"),
      invoiceTotalAmount: byId("invoiceTotalAmount"),
      saveInvoiceBtn: byId("saveInvoiceBtn"),

      invoiceViewModal: byId("invoiceViewModal"),
      closeInvoiceViewModalBtn: byId("closeInvoiceViewModalBtn"),
      invoiceViewContent: byId("invoiceViewContent"),

      paymentTypeModal: byId("paymentTypeModal"),
      closePaymentTypeModalBtn: byId("closePaymentTypeModalBtn"),
      payByInvoiceBtn: byId("payByInvoiceBtn"),
      partialPaymentBtn: byId("partialPaymentBtn"),

      invoiceSelectionModal: byId("invoiceSelectionModal"),
      closeInvoiceSelectionModalBtn: byId("closeInvoiceSelectionModalBtn"),
      invoiceSelectionList: byId("invoiceSelectionList"),
      selectedInvoicesTotal: byId("selectedInvoicesTotal"),
      cancelInvoiceSelectionBtn: byId("cancelInvoiceSelectionBtn"),
      proceedInvoiceSelectionBtn: byId("proceedInvoiceSelectionBtn"),

      partialPaymentModal: byId("partialPaymentModal"),
      closePartialPaymentModalBtn: byId("closePartialPaymentModalBtn"),
      partialInvoiceSelect: byId("partialInvoiceSelect"),
      partialAmountInput: byId("partialAmountInput"),
      partialBalanceInfo: byId("partialBalanceInfo"),
      proceedPartialPaymentBtn: byId("proceedPartialPaymentBtn"),

      paymentMethodModal: byId("paymentMethodModal"),
      closePaymentMethodModalBtn: byId("closePaymentMethodModalBtn"),
      paymentMethodSelect: byId("paymentMethodSelect"),
      chequeNumberWrap: byId("chequeNumberWrap"),
      chequeNumberInput: byId("chequeNumberInput"),
      chequeDateWrap: byId("chequeDateWrap"),
      chequeDateInput: byId("chequeDateInput"),
      chequePostDatedWrap: byId("chequePostDatedWrap"),
      chequePostDatedInput: byId("chequePostDatedInput"),
      onlineReferenceWrap: byId("onlineReferenceWrap"),
      onlineReferenceInput: byId("onlineReferenceInput"),
      onlinePlatformWrap: byId("onlinePlatformWrap"),
      onlinePlatformInput: byId("onlinePlatformInput"),
      cashBankAccountWrap: byId("cashBankAccountWrap"),
      cashBankAccountInput: byId("cashBankAccountInput"),
      paymentReviewBox: byId("paymentReviewBox"),
      savePaymentBtn: byId("savePaymentBtn"),

      execDateFrom: byId("execDateFrom"),
      execDateTo: byId("execDateTo"),
      applyExecFilterBtn: byId("applyExecFilterBtn"),
      clearExecFilterBtn: byId("clearExecFilterBtn"),
      execCustomers: byId("execCustomers"),
      execInvoices: byId("execInvoices"),
      execInvoiced: byId("execInvoiced"),
      execCollected: byId("execCollected"),
      execOutstanding: byId("execOutstanding"),
      execOverdue: byId("execOverdue"),
      monthlyChart: byId("monthlyChart"),
      topCustomersChart: byId("topCustomersChart"),
      agingTableBody: byId("agingTableBody"),

      logTableBody: byId("logTableBody"),

      usersTableBody: byId("usersTableBody"),
      openUserModalBtn: byId("openUserModalBtn"),
      userModal: byId("userModal"),
      closeUserModalBtn: byId("closeUserModalBtn"),
      newUsername: byId("newUsername"),
      newPassword: byId("newPassword"),
      newUserRole: byId("newUserRole"),
      saveUserBtn: byId("saveUserBtn")
    };
  }

  function bindEvents() {
    el.loginBtn.addEventListener("click", login);
    el.loginPassword.addEventListener("keydown", (e) => e.key === "Enter" && login());
    el.openChangePasswordBtn.addEventListener("click", openChangePasswordModal);
    el.saveOwnPasswordBtn.addEventListener("click", saveOwnPassword);

    el.navCustomers.addEventListener("click", () => setView("customers"));
    el.navExecutive.addEventListener("click", () => setView("executive"));
    el.navLogs.addEventListener("click", () => setView("logs"));
    el.navUsers.addEventListener("click", () => setView("users"));
    el.logoutBtn.addEventListener("click", logout);

    el.openCustomerModalBtn.addEventListener("click", openAddCustomerModal);
    el.customerSearchBtn.addEventListener("click", runCustomerSearch);
    el.customerClearSearchBtn.addEventListener("click", clearCustomerSearch);
    el.customerSearch.addEventListener("keydown", (e) => e.key === "Enter" && runCustomerSearch());

    el.closeCustomerModalBtn.addEventListener("click", closeCustomerModal);
    el.addContactBtn.addEventListener("click", () => addContactRow());
    el.saveCustomerBtn.addEventListener("click", saveCustomer);

    el.createInvoiceBtn.addEventListener("click", openInvoiceModalForCreate);
    el.makePaymentBtn.addEventListener("click", openPaymentTypeModal);
    el.editCustomerBtn.addEventListener("click", openEditCustomerModal);
    el.deleteCustomerBtn.addEventListener("click", deleteCustomer);

    el.closeInvoiceModalBtn.addEventListener("click", closeInvoiceModal);
    el.addLineBtn.addEventListener("click", () => addLineItemRow());
    el.saveInvoiceBtn.addEventListener("click", saveInvoice);
    el.closeInvoiceViewModalBtn.addEventListener("click", closeInvoiceViewModal);

    el.closePaymentTypeModalBtn.addEventListener("click", closePaymentTypeModal);
    el.payByInvoiceBtn.addEventListener("click", openPayByInvoiceStep);
    el.partialPaymentBtn.addEventListener("click", openPartialPaymentStep);

    el.closeInvoiceSelectionModalBtn.addEventListener("click", closeInvoiceSelectionModal);
    el.cancelInvoiceSelectionBtn.addEventListener("click", closeInvoiceSelectionModal);
    el.proceedInvoiceSelectionBtn.addEventListener("click", proceedSelectedInvoices);

    el.closePartialPaymentModalBtn.addEventListener("click", closePartialPaymentModal);
    el.partialInvoiceSelect.addEventListener("change", renderPartialBalanceInfo);
    el.partialAmountInput.addEventListener("input", renderPartialBalanceInfo);
    el.proceedPartialPaymentBtn.addEventListener("click", proceedPartialPayment);

    el.closePaymentMethodModalBtn.addEventListener("click", closePaymentMethodModal);
    el.paymentMethodSelect.addEventListener("change", renderPaymentMethodFields);
    el.savePaymentBtn.addEventListener("click", savePayment);

    el.applyExecFilterBtn.addEventListener("click", renderExecutiveView);
    el.clearExecFilterBtn.addEventListener("click", () => {
      el.execDateFrom.value = "";
      el.execDateTo.value = "";
      renderExecutiveView();
    });

    el.openUserModalBtn.addEventListener("click", openUserModal);
    el.closeUserModalBtn.addEventListener("click", closeUserModal);
    el.saveUserBtn.addEventListener("click", saveUser);

    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal").forEach((m) => (m.style.display = "none"));
      }
    });
  }

  async function bootstrap() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      console.error(error);
      showLogin();
      return;
    }

    const session = data.session;

    if (!session || !session.user) {
      showLogin();
      return;
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileError || !profile) {
      showLogin();
      return;
    }

    window.currentProfile = profile;
    state.currentUserId = session.user.id;
    saveState();
    
  }

  async function loadCustomersFromSupabase() {
    const { data, error } = await supabaseClient
      .from("customers")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      alert("Load customers failed: " + error.message);
      return;
    }

    state.customers = (data || []).map((customer) => ({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email || "",
      contacts: [],
      invoices: [],
      payments: [],
      createdAt: customer.created_at,
      updatedAt: customer.updated_at
    }));

    renderCustomerList();
  }

  async function loadSelectedCustomerDetails() {
    if (!selectedCustomerId) return;

    const customer = state.customers.find((c) => c.id === selectedCustomerId);
    if (!customer) return;

    const { data: contacts, error: contactsError } = await supabaseClient
      .from("customer_contacts")
      .select("*")
      .eq("customer_id", selectedCustomerId)
      .order("created_at", { ascending: true });

    if (contactsError) {
      alert("Load contacts failed: " + contactsError.message);
      return;
    }

    customer.contacts = (contacts || []).map((c) => ({
      name: c.contact_name || "",
      phone: c.phone || "",
      email: c.email || ""
    }));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.users = Array.isArray(parsed.users) ? parsed.users : [defaultOwnerUser()];
        parsed.customers = Array.isArray(parsed.customers) ? parsed.customers : [];
        parsed.logs = Array.isArray(parsed.logs) ? parsed.logs : [];
        parsed.currentUserId = parsed.currentUserId || null;
        if (!parsed.users.some((u) => u.role === "owner")) parsed.users.unshift(defaultOwnerUser());
        parsed.customers.forEach(normalizeCustomer);
        return parsed;
      }
    } catch (error) {
      console.error("Failed to load state", error);
    }

    return { users: [defaultOwnerUser()], customers: [], logs: [], currentUserId: null };
  }

  function normalizeCustomer(customer) {
    customer.contacts = Array.isArray(customer.contacts) ? customer.contacts : [];
    customer.invoices = Array.isArray(customer.invoices) ? customer.invoices : [];
    customer.payments = Array.isArray(customer.payments) ? customer.payments : [];
    customer.invoices.forEach((invoice) => {
      invoice.notice = invoice.notice || "None";
      invoice.chequeFollowUpDate = invoice.chequeFollowUpDate || "";
      invoice.paidAmount = round2(invoice.paidAmount || 0);
      invoice.total = round2(invoice.total || 0);
      invoice.balance = round2(invoice.balance || 0);
      invoice.status = invoice.status || getPrimaryStatus(invoice.balance, invoice.total);
    });
    customer.payments.forEach((payment) => {
      payment.allocations = Array.isArray(payment.allocations) ? payment.allocations : [];
      payment.details = payment.details || {};
    });
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function defaultOwnerUser() {
    return {
      id: uid(),
      username: "owner",
      password: "AKY123!owner",
      role: "owner",
      active: true,
      tempPassword: true,
      createdAt: nowIso()
    };
  }

function getCurrentUser() {
  if (window.currentProfile) {
    return {
      id: window.currentProfile.id,
      username: window.currentProfile.username,
      role: window.currentProfile.role,
      tempPassword: window.currentProfile.must_change_password,
      active: window.currentProfile.is_active
    };
  }

  return state.users.find((u) => u.id === state.currentUserId) || null;
}

  function hasRole(...roles) {
    const user = getCurrentUser();
    return !!user && roles.includes(user.role);
  }

  function isOwner() { return hasRole("owner"); }
  function canEditData() { return hasRole("owner", "admin"); }
  function canAccessExecutive() { return hasRole("owner", "co-owner"); }
  function canAccessLogs() { return hasRole("owner", "admin", "co-owner"); }

async function login() {
  try {
    alert("LOGIN CLICKED");

    const email = el.loginUsername.value.trim();
    const password = el.loginPassword.value;

    if (!email || !password) {
      el.loginMessage.textContent = "Please enter your email and password.";
      alert("Please enter your email and password.");
      return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      el.loginMessage.textContent = error.message;
      alert("LOGIN ERROR: " + error.message);
      return;
    }

    const user = data.user;

    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      el.loginMessage.textContent = profileError.message;
      alert("PROFILE ERROR: " + profileError.message);
      return;
    }

    if (!profile) {
      el.loginMessage.textContent = "Profile not found.";
      alert("PROFILE ERROR: Profile not found.");
      return;
    }

    window.currentProfile = profile;
    state.currentUserId = user.id;
    saveState();

    el.loginMessage.textContent = "";
    el.loginPassword.value = "";

  

    if (profile.must_change_password) {
      openChangePasswordModal(true);
    }
  } catch (err) {
    console.error(err);
    el.loginMessage.textContent = err.message || "Unexpected error.";
    alert("UNEXPECTED ERROR: " + (err.message || "Unknown error"));
  }
}
async function logout() {
  await supabaseClient.auth.signOut();
  window.currentProfile = null;
  state.currentUserId = null;
  saveState();
  selectedCustomerId = null;
  showLogin();
}

  function openChangePasswordModal(force = false) {
    const user = getCurrentUser();
    if (!user) return;
    el.changePasswordTitle.textContent = force ? "Change Temporary Password" : "Change Password";
    el.newOwnPassword.value = "";
    el.confirmOwnPassword.value = "";
    openModal(el.changePasswordModal);
  }

  function validatePassword(password) {
    if (password.length < 10) return "Password must be at least 10 characters.";
    if (!/[A-Z]/.test(password)) return "Password needs at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password needs at least one lowercase letter.";
    if (!/[0-9]/.test(password)) return "Password needs at least one number.";
    if (!/[^A-Za-z0-9]/.test(password)) return "Password needs at least one special character.";
    return "";
  }

async function saveOwnPassword() {
  const password = el.newOwnPassword.value;
  const confirm = el.confirmOwnPassword.value;
  const user = getCurrentUser();
  if (!user) return;

  const error = validatePassword(password);
  if (error) return alert(error);
  if (password !== confirm) return alert("Passwords do not match.");

  const { error: authError } = await supabaseClient.auth.updateUser({
    password
  });

  if (authError) {
    alert(authError.message);
    return;
  }

  const { error: profileError } = await supabaseClient
    .from("profiles")
    .update({ must_change_password: false })
    .eq("id", user.id);

  if (profileError) {
    alert(profileError.message);
    return;
  }

  if (window.currentProfile) {
    window.currentProfile.must_change_password = false;
  }

  closeModal(el.changePasswordModal);
  renderCurrentUser();
  alert("Password changed successfully.");
}

  function showLogin() {
    el.loginScreen.classList.remove("hidden");
    el.appShell.classList.add("hidden");
    el.loginUsername.value = "";
    el.loginPassword.value = "";
    el.loginMessage.textContent = "";
  }

async function showApp() {
  el.loginScreen.classList.add("hidden");
  el.appShell.classList.remove("hidden");

  renderCurrentUser();

  await loadCustomersFromSupabase();

  if (selectedCustomerId) {
    await loadSelectedCustomerDetails();
    await loadInvoicesForSelectedCustomer();
  }

  renderCurrentCustomerDashboard();
  renderUsersTable();
  renderLogs();
  renderExecutiveView();
  setView(currentView);
}

  function renderCurrentUser() {
    const user = getCurrentUser();
    if (!user) return;

    el.currentUserInfo.innerHTML = `<strong>${escapeHtml(user.username)}</strong><br>Role: <strong>${escapeHtml(capitalizeRole(user.role))}</strong>`;

    document.querySelectorAll(".owner-only").forEach((node) => node.classList.toggle("hidden", !isOwner()));
    document.querySelectorAll(".edit-access").forEach((node) => node.classList.toggle("hidden", !canEditData()));
    document.querySelectorAll(".executive-access").forEach((node) => node.classList.toggle("hidden", !canAccessExecutive()));
    document.querySelectorAll(".log-access").forEach((node) => node.classList.toggle("hidden", !canAccessLogs()));
    el.openCustomerModalBtn.classList.toggle("hidden", hasRole("co-owner"));
    el.createInvoiceBtn.classList.toggle("hidden", !canEditData());
    el.makePaymentBtn.classList.toggle("hidden", hasRole("co-owner"));
  }

  function setView(view) {
    currentView = view;

    el.customersView.classList.add("hidden");
    el.executiveView.classList.add("hidden");
    el.logView.classList.add("hidden");
    el.userAdminView.classList.add("hidden");

    [el.navCustomers, el.navExecutive, el.navLogs, el.navUsers].forEach((btn) => btn.classList.remove("active"));

    if (view === "customers") {
      el.customersView.classList.remove("hidden");
      el.navCustomers.classList.add("active");
    } else if (view === "executive" && canAccessExecutive()) {
      el.executiveView.classList.remove("hidden");
      el.navExecutive.classList.add("active");
      renderExecutiveView();
    } else if (view === "logs" && canAccessLogs()) {
      el.logView.classList.remove("hidden");
      el.navLogs.classList.add("active");
      renderLogs();
    } else if (view === "users" && isOwner()) {
      el.userAdminView.classList.remove("hidden");
      el.navUsers.classList.add("active");
      renderUsersTable();
    } else {
      currentView = "customers";
      el.customersView.classList.remove("hidden");
      el.navCustomers.classList.add("active");
    }
  }

  function runCustomerSearch() {
    customerSearchTerm = el.customerSearch.value.trim().toLowerCase();
    renderCustomerList();
  }

  function clearCustomerSearch() {
    el.customerSearch.value = "";
    customerSearchTerm = "";
    renderCustomerList();
  }

  function openAddCustomerModal() {
    if (hasRole("co-owner")) return;
    editingCustomerId = null;
    el.customerModalTitle.textContent = "Add Customer";
    el.customerFormName.value = "";
    el.customerFormPhone.value = "";
    el.customerFormEmail.value = "";
    el.additionalContacts.innerHTML = "";
    addContactRow();
    openModal(el.customerModal);
  }

  function openEditCustomerModal() {
    if (!canEditData()) return;
    const customer = getSelectedCustomer();
    if (!customer) return;

    editingCustomerId = customer.id;
    el.customerModalTitle.textContent = "Edit Customer";
    el.customerFormName.value = customer.name || "";
    el.customerFormPhone.value = customer.phone || "";
    el.customerFormEmail.value = customer.email || "";
    el.additionalContacts.innerHTML = "";
    (customer.contacts.length ? customer.contacts : [{}]).forEach((contact) => addContactRow(contact));
    openModal(el.customerModal);
  }

  function closeCustomerModal() { closeModal(el.customerModal); }

  function addContactRow(contact = {}) {
    const row = document.createElement("div");
    row.className = "form-grid two-col contact-card";
    row.innerHTML = `
      <div class="field"><label>Contact Name</label><input type="text" class="contact-name" value="${escapeAttr(contact.name || "")}"></div>
      <div class="field"><label>Contact Phone</label><input type="text" class="contact-phone" value="${escapeAttr(contact.phone || "")}"></div>
      <div class="field"><label>Contact Email</label><input type="email" class="contact-email" value="${escapeAttr(contact.email || "")}"></div>
      <div class="field" style="display:flex;align-items:end;"><button type="button" class="btn btn-danger wide-btn remove-contact-btn">Remove Contact</button></div>`;
    row.querySelector(".remove-contact-btn").addEventListener("click", () => row.remove());
    el.additionalContacts.appendChild(row);
  }

 async function saveCustomer() {
  if (hasRole("co-owner")) return;

  const name = el.customerFormName.value.trim();
  const phone = el.customerFormPhone.value.trim();
  const email = el.customerFormEmail.value.trim();

  if (!name) {
    alert("Customer name is required.");
    return;
  }

  if (!phone) {
    alert("Phone number is required.");
    return;
  }

  const contacts = [...el.additionalContacts.querySelectorAll(".contact-card")]
    .map((card) => ({
      contact_name: card.querySelector(".contact-name").value.trim(),
      phone: card.querySelector(".contact-phone").value.trim(),
      email: card.querySelector(".contact-email").value.trim()
    }))
    .filter((c) => c.contact_name || c.phone || c.email);

  const currentUser = getCurrentUser();
  if (!currentUser) {
    alert("No logged in user found.");
    return;
  }

  try {
    if (editingCustomerId) {
      const { error: updateError } = await supabaseClient
        .from("customers")
        .update({
          name,
          phone,
          email: email || null,
          updated_at: new Date().toISOString()
        })
        .eq("id", editingCustomerId);

      if (updateError) {
        alert(updateError.message);
        return;
      }

      const { error: deleteContactsError } = await supabaseClient
        .from("customer_contacts")
        .delete()
        .eq("customer_id", editingCustomerId);

      if (deleteContactsError) {
        alert(deleteContactsError.message);
        return;
      }

      if (contacts.length > 0) {
        const contactRows = contacts.map((c) => ({
          customer_id: editingCustomerId,
          contact_name: c.contact_name || null,
          phone: c.phone || null,
          email: c.email || null
        }));

        const { error: insertContactsError } = await supabaseClient
          .from("customer_contacts")
          .insert(contactRows);

        if (insertContactsError) {
          alert(insertContactsError.message);
          return;
        }
      }
    } else {
      const { data: newCustomer, error: insertError } = await supabaseClient
        .from("customers")
        .insert([
          {
            name,
            phone,
            email: email || null,
            created_by: currentUser.id
          }
        ])
        .select()
        .single();

      if (insertError) {
        alert(insertError.message);
        return;
      }

      if (contacts.length > 0) {
        const contactRows = contacts.map((c) => ({
          customer_id: newCustomer.id,
          contact_name: c.contact_name || null,
          phone: c.phone || null,
          email: c.email || null
        }));

        const { error: insertContactsError } = await supabaseClient
          .from("customer_contacts")
          .insert(contactRows);

        if (insertContactsError) {
          alert(insertContactsError.message);
          return;
        }
      }

      selectedCustomerId = newCustomer.id;
    }

    closeCustomerModal();
    editingCustomerId = null;
    await loadCustomersFromSupabase();
    await loadSelectedCustomerDetails();
    async function loadInvoicesForSelectedCustomer() {
  if (!selectedCustomerId) return;

  const customer = state.customers.find((c) => c.id === selectedCustomerId);
  if (!customer) return;

  const { data, error } = await supabaseClient
    .from("invoices")
    .select("*")
    .eq("customer_id", selectedCustomerId)
    .order("invoice_date", { ascending: false });

  if (error) {
    alert("Load invoices failed: " + error.message);
    return;
  }

  customer.invoices = (data || []).map((invoice) => ({
    id: invoice.id,
    number: invoice.invoice_number,
    date: invoice.invoice_date,
    po: invoice.po_number || "",
    reference: invoice.reference_info || "",
    items: [],
    total: Number(invoice.total_amount || 0),
    paidAmount: Number(invoice.paid_amount || 0),
    balance: Number(invoice.balance_amount || 0),
    status:
      invoice.primary_status === "PAID"
        ? "Paid"
        : invoice.primary_status === "PARTIALLY_PAID"
        ? "Partially Paid"
        : "Unpaid",
    notice:
      invoice.payment_notice_status === "POST_DATED"
        ? "Post-Dated Cheque"
        : invoice.payment_notice_status === "PENDING_CHEQUE_CLEARANCE"
        ? "Pending Cheque Clearance"
        : "None",
    chequeFollowUpDate: "",
    createdAt: invoice.created_at,
    updatedAt: invoice.updated_at
  }));
}
    renderCurrentCustomerDashboard();
    alert("Customer saved successfully.");
  } catch (err) {
    console.error(err);
    alert("Customer save failed: " + err.message);
  }
}
  function deleteCustomer() {
    if (!canEditData()) return;
    const customer = getSelectedCustomer();
    if (!customer) return;
    if (!confirm(`Delete customer "${customer.name}"? This will also delete invoices and payments.`)) return;

    const reason = requireExplanationIfNeeded("delete this customer");
    if (reason === null) return;
    logAction("Delete", "Customer", customer.name, reason, customer, null);
    state.customers = state.customers.filter((c) => c.id !== customer.id);
    selectedCustomerId = null;
    saveState();
    renderCustomerList();
    renderCurrentCustomerDashboard();
    renderExecutiveView();
    renderLogs();
  }

  function renderCustomerList() {
    const customers = state.customers.filter((c) => c.name.toLowerCase().includes(customerSearchTerm)).sort((a, b) => a.name.localeCompare(b.name));
    el.customerList.innerHTML = "";
    if (customers.length === 0) {
      el.customerList.innerHTML = `<div class="muted">No matching customers.</div>`;
      return;
    }

    customers.forEach((customer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "customer-item" + (customer.id === selectedCustomerId ? " active" : "");
      button.textContent = customer.name;
      button.addEventListener("click", async () => {
  selectedCustomerId = customer.id;
  await loadSelectedCustomerDetails();
  await loadInvoicesForSelectedCustomer();
  renderCustomerList();
  renderCurrentCustomerDashboard();
  setView("customers");
});
      el.customerList.appendChild(button);
    });
  }

  function getSelectedCustomer() {
    return state.customers.find((c) => c.id === selectedCustomerId) || null;
  }

  function renderCurrentCustomerDashboard() {
    const customer = getSelectedCustomer();
    if (!customer) {
      el.welcomePanel.classList.remove("hidden");
      el.customerDashboard.classList.add("hidden");
      return;
    }

    el.welcomePanel.classList.add("hidden");
    el.customerDashboard.classList.remove("hidden");
    el.customerTitle.textContent = customer.name;
    el.customerMeta.textContent = `Primary Phone: ${customer.phone}${customer.email ? " | Email: " + customer.email : ""}`;

    renderCustomerContacts(customer);
    renderCustomerSummary(customer);
    renderInvoiceTable(customer);
    renderPaymentTable(customer);
    renderAlertBox(customer);
  }

  function renderCustomerContacts(customer) {
    const contacts = [{ name: customer.name, phone: customer.phone, email: customer.email, primary: true }, ...customer.contacts];
    el.customerContacts.innerHTML = contacts.map((contact, index) => `
      <div class="contact-card">
        <strong>${contact.primary ? "Primary Contact" : "Additional Contact " + index}</strong><br>
        Name: ${escapeHtml(contact.name || "-")}<br>
        Phone: ${escapeHtml(contact.phone || "-")}<br>
        Email: ${escapeHtml(contact.email || "-")}
      </div>`).join("");
  }

  function renderCustomerSummary(customer) {
    const totalInvoiced = customer.invoices.reduce((sum, invoice) => sum + invoice.total, 0);
    const totalCollected = customer.payments.filter((p) => p.cleared !== false).reduce((sum, payment) => sum + payment.amount, 0);
    const totalOutstanding = customer.invoices.reduce((sum, invoice) => sum + invoice.balance, 0);
    const overdueCount = customer.invoices.filter((inv) => inv.balance > 0 && getDaysOpen(inv.date) > 90).length;

    el.sumInvoiced.textContent = formatPeso(totalInvoiced);
    el.sumCollected.textContent = formatPeso(totalCollected);
    el.sumOutstanding.textContent = formatPeso(totalOutstanding);
    el.sumOverdue.textContent = String(overdueCount);
  }

  function renderAlertBox(customer) {
    const alerts = [];
    customer.invoices.filter((inv) => inv.balance > 0 && getDaysOpen(inv.date) > 90).forEach((inv) => {
      alerts.push(`Overdue 90+ days: ${inv.number} (${formatPeso(inv.balance)})`);
    });
    customer.invoices.filter((inv) => inv.notice === "Post-Dated Cheque").forEach((inv) => {
      alerts.push(`Post-dated cheque follow-up: ${inv.number} on ${inv.chequeFollowUpDate || "date missing"}`);
    });

    if (!alerts.length) {
      el.overdueAlertBox.classList.add("hidden");
      el.overdueAlertBox.innerHTML = "";
      return;
    }

    el.overdueAlertBox.classList.remove("hidden");
    el.overdueAlertBox.innerHTML = alerts.map((item) => `<div>${escapeHtml(item)}</div>`).join("");
  }

  function openInvoiceModalForCreate() {
    if (!canEditData()) return;
    if (!getSelectedCustomer()) return alert("Please select a customer first.");
    editingInvoiceId = null;
    el.invoiceModalTitle.textContent = "Create Invoice";
    clearInvoiceForm();
    el.invoiceDate.value = todayStr();
    addLineItemRow();
    updateInvoiceTotal();
    openModal(el.invoiceModal);
  }

  function openInvoiceModalForEdit(invoiceId) {
    if (!canEditData()) return;
    const customer = getSelectedCustomer();
    if (!customer) return;
    const invoice = customer.invoices.find((x) => x.id === invoiceId);
    if (!invoice) return;

    editingInvoiceId = invoice.id;
    el.invoiceModalTitle.textContent = "Edit Invoice";
    clearInvoiceForm();
    el.invoiceNumber.value = invoice.number;
    el.invoiceDate.value = invoice.date;
    el.poNumber.value = invoice.po || "";
    el.referenceInfo.value = invoice.reference || "";
    invoice.items.forEach((item) => addLineItemRow(item));
    updateInvoiceTotal();
    openModal(el.invoiceModal);
  }

  function clearInvoiceForm() {
    el.invoiceNumber.value = "";
    el.invoiceDate.value = "";
    el.poNumber.value = "";
    el.referenceInfo.value = "";
    el.lineItemsContainer.innerHTML = "";
    el.invoiceTotalAmount.textContent = formatPeso(0);
  }

  function closeInvoiceModal() { closeModal(el.invoiceModal); }

  function addLineItemRow(item = {}) {
    const row = document.createElement("div");
    row.className = "line-item";
    row.innerHTML = `
      <input type="text" class="line-product" placeholder="Product name" value="${escapeAttr(item.product || "")}">
      <input type="number" class="line-qty" placeholder="Qty" min="0" step="0.01" value="${item.qty ?? ""}">
      <input type="number" class="line-price" placeholder="Price" min="0" step="0.01" value="${item.price ?? ""}">
      <div class="line-total-box">₱0</div>
      <button type="button" class="delete-line-btn">&times;</button>`;

    const qtyInput = row.querySelector(".line-qty");
    const priceInput = row.querySelector(".line-price");
    const totalBox = row.querySelector(".line-total-box");
    const recalc = () => {
      const qty = num(qtyInput.value);
      const price = num(priceInput.value);
      totalBox.textContent = formatPeso(qty * price);
      updateInvoiceTotal();
    };

    qtyInput.addEventListener("input", recalc);
    priceInput.addEventListener("input", recalc);
    row.querySelector(".delete-line-btn").addEventListener("click", () => {
      row.remove();
      if (!el.lineItemsContainer.children.length) addLineItemRow();
      updateInvoiceTotal();
    });

    el.lineItemsContainer.appendChild(row);
    recalc();
  }

  function updateInvoiceTotal() {
    const total = [...el.lineItemsContainer.querySelectorAll(".line-item")].reduce((sum, row) => {
      return sum + num(row.querySelector(".line-qty").value) * num(row.querySelector(".line-price").value);
    }, 0);
    el.invoiceTotalAmount.textContent = formatPeso(total);
  }

  async function saveInvoice() {
  const customer = getSelectedCustomer();
  if (!customer || !canEditData()) return;

  const number = el.invoiceNumber.value.trim();
  const date = el.invoiceDate.value;
  const po = el.poNumber.value.trim();
  const reference = el.referenceInfo.value.trim();

  if (!number) return alert("Invoice number is required.");
  if (!date) return alert("Invoice date is required.");

  const items = [...el.lineItemsContainer.querySelectorAll(".line-item")]
    .map((row) => {
      const product = row.querySelector(".line-product").value.trim();
      const qty = num(row.querySelector(".line-qty").value);
      const price = num(row.querySelector(".line-price").value);
      return { product, qty, price, total: round2(qty * price) };
    })
    .filter((item) => item.product || item.qty || item.price);

  if (!items.length) return alert("Add at least one line item.");

  const total = round2(items.reduce((sum, item) => sum + item.total, 0));

  try {
    if (editingInvoiceId) {
      const existing = customer.invoices.find((inv) => inv.id === editingInvoiceId);
      if (!existing) return;

      const paidAmount = Number(existing.paidAmount || 0);
      const balanceAmount = round2(Math.max(0, total - paidAmount));
      const primaryStatus =
        balanceAmount <= 0 ? "PAID" : balanceAmount < total ? "PARTIALLY_PAID" : "UNPAID";

      const { error } = await supabaseClient
        .from("invoices")
        .update({
          invoice_number: number,
          invoice_date: date,
          po_number: po || null,
          reference_info: reference || null,
          total_amount: total,
          balance_amount: balanceAmount,
          primary_status: primaryStatus,
          updated_at: new Date().toISOString()
        })
        .eq("id", editingInvoiceId);

      if (error) {
        alert(error.message);
        return;
      }
    } else {
      const { error } = await supabaseClient
        .from("invoices")
        .insert([
          {
            customer_id: customer.id,
            invoice_number: number,
            invoice_date: date,
            po_number: po || null,
            reference_info: reference || null,
            total_amount: total,
            paid_amount: 0,
            balance_amount: total,
            primary_status: "UNPAID",
            payment_notice_status: "NONE",
            created_by: getCurrentUser().id
          }
        ]);

      if (error) {
        alert(error.message);
        return;
      }
    }

    closeInvoiceModal();
    editingInvoiceId = null;
    await loadInvoicesForSelectedCustomer();
    renderCurrentCustomerDashboard();
    alert("Invoice saved successfully.");
  } catch (err) {
    console.error(err);
    alert("Invoice save failed: " + err.message);
  }
}
    const customer = getSelectedCustomer();
    if (!customer || !canEditData()) return;

    const number = el.invoiceNumber.value.trim();
    const date = el.invoiceDate.value;
    const po = el.poNumber.value.trim();
    const reference = el.referenceInfo.value.trim();

    if (!number) return alert("Invoice number is required.");
    if (!date) return alert("Invoice date is required.");

    const items = [...el.lineItemsContainer.querySelectorAll(".line-item")].map((row) => {
      const product = row.querySelector(".line-product").value.trim();
      const qty = num(row.querySelector(".line-qty").value);
      const price = num(row.querySelector(".line-price").value);
      return { product, qty, price, total: round2(qty * price) };
    }).filter((item) => item.product || item.qty || item.price);

    if (!items.length) return alert("Add at least one line item.");
    const total = round2(items.reduce((sum, item) => sum + item.total, 0));

    if (editingInvoiceId) {
      const invoice = customer.invoices.find((inv) => inv.id === editingInvoiceId);
      if (!invoice) return;
      const reason = requireExplanationIfNeeded("edit this invoice");
      if (reason === null) return;
      const before = clone(invoice);
      const alreadyPaid = invoice.paidAmount || 0;
      invoice.number = number;
      invoice.date = date;
      invoice.po = po;
      invoice.reference = reference;
      invoice.items = items;
      invoice.total = total;
      invoice.balance = round2(Math.max(0, total - alreadyPaid));
      invoice.status = getPrimaryStatus(invoice.balance, invoice.total);
      invoice.updatedAt = nowIso();
      logAction("Edit", "Invoice", number, reason, before, invoice);
    } else {
      const invoice = {
        id: uid(), number, date, po, reference, items, total,
        paidAmount: 0, balance: total, status: "Unpaid", notice: "None",
        chequeFollowUpDate: "", createdAt: nowIso(), updatedAt: nowIso()
      };
      customer.invoices.push(invoice);
      logAction("Create", "Invoice", number, "", null, invoice);
    }

    saveState();
    closeInvoiceModal();
    renderCurrentCustomerDashboard();
    renderExecutiveView();
    renderLogs();
  }

  async function deleteInvoice(invoiceId) {
  if (!canEditData()) return;

  const customer = getSelectedCustomer();
  if (!customer) return;

  const invoice = customer.invoices.find((inv) => inv.id === invoiceId);
  if (!invoice) return;

  if (!confirm(`Delete invoice ${invoice.number}?`)) return;

  try {
    const { error } = await supabaseClient
      .from("invoices")
      .delete()
      .eq("id", invoiceId);

    if (error) {
      alert(error.message);
      return;
    }

    await loadInvoicesForSelectedCustomer();
    renderCurrentCustomerDashboard();
    alert("Invoice deleted successfully.");
  } catch (err) {
    console.error(err);
    alert("Invoice delete failed: " + err.message);
  }
}
    if (!canEditData()) return;
    const customer = getSelectedCustomer();
    if (!customer) return;
    const invoice = customer.invoices.find((inv) => inv.id === invoiceId);
    if (!invoice) return;
    if (!confirm(`Delete invoice ${invoice.number}?`)) return;

    const reason = requireExplanationIfNeeded("delete this invoice");
    if (reason === null) return;
    logAction("Delete", "Invoice", invoice.number, reason, invoice, null);

    customer.payments.forEach((payment) => {
      payment.allocations = payment.allocations.filter((alloc) => alloc.invoiceId !== invoiceId);
    });
    customer.invoices = customer.invoices.filter((inv) => inv.id !== invoiceId);
    customer.payments = customer.payments.filter((payment) => payment.allocations.length > 0);

    saveState();
    renderCurrentCustomerDashboard();
    renderExecutiveView();
    renderLogs();
  }

  function viewInvoice(invoiceId) {
    const customer = getSelectedCustomer();
    if (!customer) return;
    const invoice = customer.invoices.find((inv) => inv.id === invoiceId);
    if (!invoice) return;

    const itemsHtml = invoice.items.map((item) => `
      <tr><td>${escapeHtml(item.product || "-")}</td><td>${formatNumber(item.qty)}</td><td>${formatPeso(item.price)}</td><td>${formatPeso(item.total)}</td></tr>`).join("");

    el.invoiceViewContent.innerHTML = `
      <div class="invoice-meta-grid">
        <div class="invoice-meta-card"><span>Invoice #</span><strong>${escapeHtml(invoice.number)}</strong></div>
        <div class="invoice-meta-card"><span>Date</span><strong>${escapeHtml(invoice.date)}</strong></div>
        <div class="invoice-meta-card"><span>PO #</span><strong>${escapeHtml(invoice.po || "-")}</strong></div>
        <div class="invoice-meta-card"><span>Reference</span><strong>${escapeHtml(invoice.reference || "-")}</strong></div>
      </div>
      <div class="table-wrap"><table class="records-table"><thead><tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Line Total</th></tr></thead><tbody>${itemsHtml}</tbody></table></div>
      <div class="summary-grid" style="margin-top:16px;">
        <div class="panel summary-card"><span class="summary-label">Invoice Total</span><strong>${formatPeso(invoice.total)}</strong></div>
        <div class="panel summary-card"><span class="summary-label">Paid</span><strong>${formatPeso(invoice.paidAmount)}</strong></div>
        <div class="panel summary-card"><span class="summary-label">Balance</span><strong>${formatPeso(invoice.balance)}</strong></div>
        <div class="panel summary-card"><span class="summary-label">Status</span><strong>${escapeHtml(invoice.status)} / ${escapeHtml(invoice.notice || "None")}</strong></div>
      </div>`;
    openModal(el.invoiceViewModal);
  }

  function closeInvoiceViewModal() { closeModal(el.invoiceViewModal); }

  function renderInvoiceTable(customer) {
    el.invoiceTableBody.innerHTML = "";
    if (!customer.invoices.length) {
      el.invoiceTableBody.innerHTML = `<tr><td colspan="${canEditData() ? 10 : 9}" class="muted">No invoices yet.</td></tr>`;
      return;
    }

    customer.invoices.slice().sort((a, b) => String(b.date).localeCompare(String(a.date))).forEach((invoice) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="clickable">${escapeHtml(invoice.number)}</td>
        <td>${escapeHtml(invoice.date)}</td>
        <td>${escapeHtml(invoice.po || "-")}</td>
        <td>${escapeHtml(invoice.reference || "-")}</td>
        <td>${formatPeso(invoice.total)}</td>
        <td>${formatPeso(invoice.paidAmount)}</td>
        <td>${formatPeso(invoice.balance)}</td>
        <td>${statusPill(invoice.status)}</td>
        <td>${noticePill(invoice.notice, invoice.chequeFollowUpDate)}</td>
        ${canEditData() ? `<td><div class="row-actions"><button class="btn btn-light action-edit">Edit</button><button class="btn btn-danger action-delete">Delete</button></div></td>` : ""}`;
      tr.querySelector(".clickable").addEventListener("click", () => viewInvoice(invoice.id));
      if (canEditData()) {
        tr.querySelector(".action-edit").addEventListener("click", () => openInvoiceModalForEdit(invoice.id));
        tr.querySelector(".action-delete").addEventListener("click", () => deleteInvoice(invoice.id));
      }
      el.invoiceTableBody.appendChild(tr);
    });
  }

  function openPaymentTypeModal() {
    const customer = getSelectedCustomer();
    if (!customer) return alert("Please select a customer first.");
    if (hasRole("co-owner")) return;
    const openInvoices = customer.invoices.filter((inv) => inv.balance > 0);
    if (!openInvoices.length) return alert("This customer has no open invoices.");
    paymentDraft = null;
    openModal(el.paymentTypeModal);
  }

  function closePaymentTypeModal() { closeModal(el.paymentTypeModal); }

  function openPayByInvoiceStep() {
    const customer = getSelectedCustomer();
    if (!customer) return;
    closePaymentTypeModal();

    el.invoiceSelectionList.innerHTML = "";
    el.selectedInvoicesTotal.textContent = formatPeso(0);
    customer.invoices.filter((inv) => inv.balance > 0).forEach((invoice) => {
      const label = document.createElement("label");
      label.className = "selection-item";
      label.innerHTML = `
        <input type="checkbox" data-id="${invoice.id}">
        <div><strong>${escapeHtml(invoice.number)}</strong><small>Date: ${escapeHtml(invoice.date)} | Status: ${escapeHtml(invoice.status)} | Balance: ${formatPeso(invoice.balance)}</small></div>
        <div><strong>${formatPeso(invoice.balance)}</strong></div>`;
      label.querySelector("input").addEventListener("change", updateSelectedInvoicesTotal);
      el.invoiceSelectionList.appendChild(label);
    });
    openModal(el.invoiceSelectionModal);
  }

  function updateSelectedInvoicesTotal() {
    const customer = getSelectedCustomer();
    if (!customer) return;
    const ids = [...el.invoiceSelectionList.querySelectorAll("input[type='checkbox']:checked")].map((cb) => cb.dataset.id);
    const total = customer.invoices.filter((inv) => ids.includes(inv.id)).reduce((sum, inv) => sum + inv.balance, 0);
    el.selectedInvoicesTotal.textContent = formatPeso(total);
  }

  function proceedSelectedInvoices() {
    const customer = getSelectedCustomer();
    if (!customer) return;
    const ids = [...el.invoiceSelectionList.querySelectorAll("input[type='checkbox']:checked")].map((cb) => cb.dataset.id);
    if (!ids.length) return alert("Select at least one invoice.");
    const selectedInvoices = customer.invoices.filter((inv) => ids.includes(inv.id));
    paymentDraft = { mode: "full", amount: selectedInvoices.reduce((sum, inv) => sum + inv.balance, 0), allocations: selectedInvoices.map((inv) => ({ invoiceId: inv.id, amount: inv.balance })) };
    closeInvoiceSelectionModal();
    openPaymentMethodStep();
  }

  function closeInvoiceSelectionModal() { closeModal(el.invoiceSelectionModal); }

  function openPartialPaymentStep() {
    const customer = getSelectedCustomer();
    if (!customer) return;
    closePaymentTypeModal();
    const options = customer.invoices.filter((inv) => inv.balance > 0).map((inv) => `<option value="${inv.id}">${escapeHtml(inv.number)} - Balance ${formatPeso(inv.balance)} - ${escapeHtml(inv.date)}</option>`).join("");
    el.partialInvoiceSelect.innerHTML = options;
    el.partialAmountInput.value = "";
    renderPartialBalanceInfo();
    openModal(el.partialPaymentModal);
  }

  function renderPartialBalanceInfo() {
    const customer = getSelectedCustomer();
    if (!customer) return;
    const invoice = customer.invoices.find((inv) => inv.id === el.partialInvoiceSelect.value);
    if (!invoice) {
      el.partialBalanceInfo.textContent = "Select an invoice.";
      return;
    }
    const entered = num(el.partialAmountInput.value);
    let text = `Current balance for ${invoice.number}: ${formatPeso(invoice.balance)}.`;
    if (entered > 0) {
      text += ` After this payment, remaining balance will be ${formatPeso(Math.max(0, invoice.balance - entered))}.`;
    }
    text += " Invoice stays Partially Paid until the balance becomes zero.";
    el.partialBalanceInfo.textContent = text;
  }

  function proceedPartialPayment() {
    const customer = getSelectedCustomer();
    if (!customer) return;
    const invoice = customer.invoices.find((inv) => inv.id === el.partialInvoiceSelect.value);
    const amount = num(el.partialAmountInput.value);
    if (!invoice) return alert("Please choose an invoice.");
    if (amount <= 0) return alert("Enter a valid partial amount.");
    if (amount > invoice.balance) return alert("Partial amount cannot be more than the invoice balance.");
    paymentDraft = { mode: "partial", amount, allocations: [{ invoiceId: invoice.id, amount }] };
    closePartialPaymentModal();
    openPaymentMethodStep();
  }

  function closePartialPaymentModal() { closeModal(el.partialPaymentModal); }

  function openPaymentMethodStep() {
    if (!paymentDraft) return;
    el.paymentMethodSelect.value = "";
    el.chequeNumberInput.value = "";
    el.chequeDateInput.value = todayStr();
    el.chequePostDatedInput.checked = false;
    el.onlineReferenceInput.value = "";
    el.onlinePlatformInput.value = "";
    el.cashBankAccountInput.value = "";
    renderPaymentMethodFields();

    const customer = getSelectedCustomer();
    const lines = paymentDraft.allocations.map((alloc) => {
      const invoice = customer.invoices.find((inv) => inv.id === alloc.invoiceId);
      return `${invoice ? invoice.number : "Invoice"}: ${formatPeso(alloc.amount)}`;
    });

    el.paymentReviewBox.innerHTML = `Payment Type: <strong>${paymentDraft.mode === "full" ? "Pay by Invoice" : "Partial Payment"}</strong><br>Amount: <strong>${formatPeso(paymentDraft.amount)}</strong><br>Applied To: ${lines.join(" | ")}`;
    openModal(el.paymentMethodModal);
  }

  function renderPaymentMethodFields() {
    const method = el.paymentMethodSelect.value;
    el.chequeNumberWrap.classList.toggle("hidden", method !== "Cheque");
    el.chequeDateWrap.classList.toggle("hidden", method !== "Cheque");
    el.chequePostDatedWrap.classList.toggle("hidden", method !== "Cheque");
    el.onlineReferenceWrap.classList.toggle("hidden", method !== "Online");
    el.onlinePlatformWrap.classList.toggle("hidden", method !== "Online");
    el.cashBankAccountWrap.classList.toggle("hidden", method !== "Cash");
  }

  function savePayment() {
    const customer = getSelectedCustomer();
    if (!customer || !paymentDraft) return;

    const method = el.paymentMethodSelect.value;
    if (!method) return alert("Select a payment method.");

    const details = {};
    let cleared = true;
    let notice = "None";

    if (method === "Cash") {
      details.bankAccountNumber = el.cashBankAccountInput.value.trim();
      if (!details.bankAccountNumber) return alert("Deposit bank account number is required.");
    }

    if (method === "Online") {
      details.referenceNumber = el.onlineReferenceInput.value.trim();
      details.platformName = el.onlinePlatformInput.value.trim();
      if (!details.referenceNumber) return alert("Online reference number is required.");
      if (!details.platformName) return alert("Platform / bank name is required.");
    }

    if (method === "Cheque") {
      details.chequeNumber = el.chequeNumberInput.value.trim();
      details.chequeDate = el.chequeDateInput.value;
      details.isPostDated = el.chequePostDatedInput.checked;
      if (!details.chequeNumber) return alert("Cheque number is required.");
      if (!details.chequeDate) return alert("Cheque date is required.");
      cleared = false;
      notice = details.isPostDated ? "Post-Dated Cheque" : "Pending Cheque Clearance";
    }

    const payment = {
      id: uid(),
      date: todayStr(),
      type: paymentDraft.mode === "full" ? "Pay by Invoice" : "Partial Payment",
      method,
      details,
      amount: round2(paymentDraft.amount),
      allocations: paymentDraft.allocations.map((x) => ({ ...x })),
      createdBy: getCurrentUser().username,
      createdByRole: getCurrentUser().role,
      createdAt: nowIso(),
      cleared
    };

    payment.allocations.forEach((allocation) => {
      const invoice = customer.invoices.find((inv) => inv.id === allocation.invoiceId);
      if (!invoice) return;
      if (method === "Cheque") {
        invoice.notice = notice;
        invoice.chequeFollowUpDate = details.chequeDate;
      } else {
        invoice.paidAmount = round2(invoice.paidAmount + allocation.amount);
        invoice.balance = round2(Math.max(0, invoice.total - invoice.paidAmount));
        invoice.status = getPrimaryStatus(invoice.balance, invoice.total);
        invoice.notice = "None";
        invoice.chequeFollowUpDate = "";
      }
    });

    customer.payments.push(payment);
    logAction("Create", "Payment", `${payment.type} - ${payment.method} - ${formatPeso(payment.amount)}`, "", null, payment);

    paymentDraft = null;
    saveState();
    closePaymentMethodModal();
    renderCurrentCustomerDashboard();
    renderExecutiveView();
    renderLogs();
  }

  function closePaymentMethodModal() { closeModal(el.paymentMethodModal); }

  function deletePayment(paymentId) {
    if (!canEditData()) return;
    const customer = getSelectedCustomer();
    if (!customer) return;
    const payment = customer.payments.find((p) => p.id === paymentId);
    if (!payment) return;
    if (!confirm("Delete this payment and reverse its invoice allocations?")) return;

    const reason = requireExplanationIfNeeded("delete this payment");
    if (reason === null) return;
    const before = clone(payment);

    payment.allocations.forEach((allocation) => {
      const invoice = customer.invoices.find((inv) => inv.id === allocation.invoiceId);
      if (!invoice) return;
      if (payment.method === "Cheque") {
        invoice.notice = "None";
        invoice.chequeFollowUpDate = "";
      } else {
        invoice.paidAmount = round2(Math.max(0, invoice.paidAmount - allocation.amount));
        invoice.balance = round2(Math.max(0, invoice.total - invoice.paidAmount));
        invoice.status = getPrimaryStatus(invoice.balance, invoice.total);
      }
    });

    customer.payments = customer.payments.filter((p) => p.id !== paymentId);
    logAction("Delete", "Payment", `${payment.type} - ${payment.method}`, reason, before, null);
    saveState();
    renderCurrentCustomerDashboard();
    renderExecutiveView();
    renderLogs();
  }

  function renderPaymentTable(customer) {
    el.paymentTableBody.innerHTML = "";
    if (!customer.payments.length) {
      el.paymentTableBody.innerHTML = `<tr><td colspan="${canEditData() ? 8 : 7}" class="muted">No payments yet.</td></tr>`;
      return;
    }

    customer.payments.slice().sort((a, b) => String(b.date).localeCompare(String(a.date))).forEach((payment) => {
      const appliedTo = payment.allocations.map((alloc) => {
        const invoice = customer.invoices.find((inv) => inv.id === alloc.invoiceId);
        return `${invoice ? invoice.number : "Deleted Invoice"} (${formatPeso(alloc.amount)})`;
      }).join(", ");

      const details = formatPaymentDetails(payment);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${escapeHtml(payment.date)}</td>
        <td>${escapeHtml(payment.type)}</td>
        <td>${escapeHtml(payment.method)}</td>
        <td>${details}</td>
        <td>${formatPeso(payment.amount)}</td>
        <td>${escapeHtml(appliedTo || "-")}</td>
        <td>${escapeHtml(payment.createdBy || "-")}</td>
        ${canEditData() ? `<td><button class="btn btn-danger action-delete-payment">Delete</button></td>` : ""}`;
      if (canEditData()) row.querySelector(".action-delete-payment").addEventListener("click", () => deletePayment(payment.id));
      el.paymentTableBody.appendChild(row);
    });
  }

  function renderExecutiveView() {
    if (!canAccessExecutive()) return;
    const filtered = getFilteredData();
    el.execCustomers.textContent = String(filtered.customerCount);
    el.execInvoices.textContent = String(filtered.invoices.length);
    el.execInvoiced.textContent = formatPeso(filtered.totalInvoiced);
    el.execCollected.textContent = formatPeso(filtered.totalCollected);
    el.execOutstanding.textContent = formatPeso(filtered.totalOutstanding);
    el.execOverdue.textContent = String(filtered.overdueInvoices.length);
    renderMonthlyChart(filtered);
    renderTopCustomers(filtered);
    renderAgingTable(filtered);
  }

  function getFilteredData() {
    const from = el.execDateFrom.value || null;
    const to = el.execDateTo.value || null;
    const invoices = [];
    const payments = [];
    state.customers.forEach((customer) => {
      customer.invoices.forEach((invoice) => passesDateFilter(invoice.date, from, to) && invoices.push({ ...invoice, customerName: customer.name }));
      customer.payments.forEach((payment) => passesDateFilter(payment.date, from, to) && payments.push({ ...payment, customerName: customer.name }));
    });
    return {
      customerCount: state.customers.length,
      invoices,
      payments,
      totalInvoiced: invoices.reduce((sum, item) => sum + item.total, 0),
      totalCollected: payments.filter((p) => p.cleared !== false).reduce((sum, item) => sum + item.amount, 0),
      totalOutstanding: invoices.reduce((sum, item) => sum + item.balance, 0),
      overdueInvoices: invoices.filter((item) => item.balance > 0 && getDaysOpen(item.date) > 90)
    };
  }

  function renderMonthlyChart(data) {
    const map = new Map();
    data.invoices.forEach((invoice) => {
      const key = (invoice.date || "").slice(0, 7) || "Unknown";
      if (!map.has(key)) map.set(key, { invoiced: 0, collected: 0 });
      map.get(key).invoiced += invoice.total;
    });
    data.payments.filter((p) => p.cleared !== false).forEach((payment) => {
      const key = (payment.date || "").slice(0, 7) || "Unknown";
      if (!map.has(key)) map.set(key, { invoiced: 0, collected: 0 });
      map.get(key).collected += payment.amount;
    });
    const entries = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0])).slice(-8);
    const max = Math.max(1, ...entries.flatMap(([, values]) => [values.invoiced, values.collected]));
    el.monthlyChart.innerHTML = entries.length ? entries.map(([month, values]) => `
      <div class="bar-col"><div class="bar-stack"><div class="bar invoiced" style="height:${(values.invoiced / max) * 200}px" title="Invoiced ${formatPeso(values.invoiced)}"></div><div class="bar collected" style="height:${(values.collected / max) * 200}px" title="Collected ${formatPeso(values.collected)}"></div></div><div class="bar-label">${escapeHtml(month)}</div></div>`).join("") : `<div class="muted">No data for selected range.</div>`;
  }

  function renderTopCustomers(data) {
    const values = state.customers.map((customer) => {
      const outstanding = customer.invoices.filter((inv) => passesDateFilter(inv.date, el.execDateFrom.value || null, el.execDateTo.value || null)).reduce((sum, inv) => sum + inv.balance, 0);
      return [customer.name, outstanding];
    }).filter(([, amount]) => amount > 0).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const max = Math.max(1, ...values.map(([, amount]) => amount), 1);
    el.topCustomersChart.innerHTML = values.length ? values.map(([name, amount]) => `
      <div class="mini-bar-row"><div>${escapeHtml(name)}</div><div class="mini-bar-track"><div class="mini-bar-fill" style="width:${(amount / max) * 100}%"></div></div><div><strong>${formatPeso(amount)}</strong></div></div>`).join("") : `<div class="muted">No outstanding balances.</div>`;
  }

  function renderAgingTable(data) {
    el.agingTableBody.innerHTML = "";
    if (!data.overdueInvoices.length) {
      el.agingTableBody.innerHTML = `<tr><td colspan="7" class="muted">No 90+ day overdue invoices.</td></tr>`;
      return;
    }
    data.overdueInvoices.sort((a, b) => getDaysOpen(b.date) - getDaysOpen(a.date)).forEach((invoice) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${escapeHtml(invoice.customerName)}</td><td>${escapeHtml(invoice.number)}</td><td>${escapeHtml(invoice.date)}</td><td>${getDaysOpen(invoice.date)}</td><td>${formatPeso(invoice.balance)}</td><td>${statusPill(invoice.status)}</td><td>${noticePill(invoice.notice, invoice.chequeFollowUpDate)}</td>`;
      el.agingTableBody.appendChild(row);
    });
  }

  function logAction(action, entity, details, explanation, before, after) {
    const user = getCurrentUser();
    state.logs.unshift({
      id: uid(), timestamp: nowIso(), username: user ? user.username : "System", role: user ? user.role : "system",
      action, entity, details, explanation: explanation || "", before, after
    });
  }

  function renderLogs() {
    if (!canAccessLogs()) return;
    el.logTableBody.innerHTML = "";
    if (!state.logs.length) {
      el.logTableBody.innerHTML = `<tr><td colspan="7" class="muted">No log entries yet.</td></tr>`;
      return;
    }
    state.logs.forEach((log) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${formatDateTime(log.timestamp)}</td><td>${escapeHtml(log.username)}</td><td>${escapeHtml(capitalizeRole(log.role))}</td><td>${escapeHtml(log.action)}</td><td>${escapeHtml(log.entity)}</td><td>${escapeHtml(log.details || "-")}</td><td>${escapeHtml(log.explanation || "-")}</td>`;
      el.logTableBody.appendChild(row);
    });
  }

  function requireExplanationIfNeeded(actionText) {
    const user = getCurrentUser();
    if (!user) return "";
    if (user.role === "admin") {
      const reason = prompt(`Explanation required. Please explain why you need to ${actionText}.`);
      if (reason === null) return null;
      if (!reason.trim()) {
        alert("Explanation is required for admin changes.");
        return null;
      }
      return reason.trim();
    }
    return "";
  }

  function openUserModal() {
    if (!isOwner()) return;
    el.newUsername.value = "";
    el.newPassword.value = "";
    el.newUserRole.value = "user";
    openModal(el.userModal);
  }

  function closeUserModal() { closeModal(el.userModal); }

  function saveUser() {
    if (!isOwner()) return;
    const username = el.newUsername.value.trim();
    const password = el.newPassword.value.trim();
    const role = el.newUserRole.value;
    if (!username) return alert("Username is required.");
    const passwordError = validatePassword(password);
    if (passwordError) return alert(passwordError);
    if (state.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) return alert("Username already exists.");

    const user = { id: uid(), username, password, role, active: true, tempPassword: true, createdAt: nowIso() };
    state.users.push(user);
    logAction("Create", "User", `${username} (${capitalizeRole(role)})`, "", null, user);
    saveState();
    closeUserModal();
    renderUsersTable();
    renderLogs();
  }

  function renderUsersTable() {
    if (!isOwner()) return;
    el.usersTableBody.innerHTML = state.users.slice().sort((a, b) => a.username.localeCompare(b.username)).map((user) => `
      <tr><td>${escapeHtml(user.username)}</td><td>${escapeHtml(capitalizeRole(user.role))}</td><td>${user.active ? "Active" : "Inactive"}</td><td>${user.tempPassword ? "Yes" : "No"}</td></tr>`).join("");
  }

  function formatPaymentDetails(payment) {
    if (payment.method === "Cash") return escapeHtml(`Deposit to: ${payment.details.bankAccountNumber || "-"}`);
    if (payment.method === "Online") return escapeHtml(`Ref: ${payment.details.referenceNumber || "-"} | ${payment.details.platformName || "-"}`);
    if (payment.method === "Cheque") {
      const text = `Cheque #: ${payment.details.chequeNumber || "-"} | Date: ${payment.details.chequeDate || "-"} | ${payment.details.isPostDated ? "Post-Dated" : "Pending Clearance"}`;
      return escapeHtml(text);
    }
    return "-";
  }

  function statusPill(status) {
    const cls = status === "Paid" ? "status-paid" : status === "Partially Paid" ? "status-partial" : "status-unpaid";
    return `<span class="status-pill ${cls}">${escapeHtml(status)}</span>`;
  }

  function noticePill(notice, date) {
    if (!notice || notice === "None") return `<span class="notice-none">-</span>`;
    const cls = notice === "Post-Dated Cheque" ? "notice-postdated" : "notice-pending";
    const label = date ? `${notice} (${date})` : notice;
    return `<span class="notice-pill ${cls}">${escapeHtml(label)}</span>`;
  }

  function getPrimaryStatus(balance, total) {
    if (balance <= 0) return "Paid";
    if (balance < total) return "Partially Paid";
    return "Unpaid";
  }

  function passesDateFilter(dateString, from, to) {
    if (!dateString) return false;
    if (from && dateString < from) return false;
    if (to && dateString > to) return false;
    return true;
  }

  function byId(id) { return document.getElementById(id); }
  function openModal(node) { node.style.display = "flex"; }
  function closeModal(node) { node.style.display = "none"; }
  function uid() { return "id_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); }
  function nowIso() { return new Date().toISOString(); }
  function todayStr() { return new Date().toISOString().split("T")[0]; }
  function num(value) { const n = parseFloat(value); return Number.isFinite(n) ? n : 0; }
  function round2(value) { return Math.round((value + Number.EPSILON) * 100) / 100; }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function formatPeso(value) { return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(round2(value || 0)); }
  function formatNumber(value) { const n = Number(value || 0); return Number.isInteger(n) ? new Intl.NumberFormat("en-PH").format(n) : new Intl.NumberFormat("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n); }
  function getDaysOpen(dateString) { return Math.max(0, Math.floor((Date.now() - new Date(dateString + "T00:00:00").getTime()) / 86400000)); }
  function formatDateTime(iso) { return new Date(iso).toLocaleString(); }
  function capitalizeRole(str) { return String(str || "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("-"); }
  function escapeHtml(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function escapeAttr(value) { return escapeHtml(value); }
})();

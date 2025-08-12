import { type Mode } from "./state";

type ComboChange = (p: { mode: Mode; value: number }) => void;

function pad2(n: number) { return String(n).padStart(2, '0'); }

class Combobox {
    private root: HTMLElement;
    private mode: Mode;
    private btn: HTMLButtonElement;
    private valueEl: HTMLElement;
    private list: HTMLUListElement;
    private options: HTMLLIElement[];
    private isOpen = false;
    private onChange: ComboChange;

    constructor(root: HTMLElement, onChange: ComboChange) {
        this.root = root;
        this.onChange = onChange;

    const row = this.root.closest<HTMLElement>('.duration-row');
    if (!row?.dataset.mode) throw new Error('Combobox: missing parent .duration-row[data-mode]');
    this.mode = row.dataset.mode as Mode;

    const btn = this.root.querySelector<HTMLButtonElement>('.combo__button');
    const valueEl = btn?.querySelector<HTMLElement>('.combo__value');
    const list = this.root.querySelector<HTMLUListElement>('.combo__list');
    if (!btn || !valueEl || !list) throw new Error('Combobox: missing required elements');

    this.btn = btn;
    this.valueEl = valueEl;
    this.list = list;
    this.options = Array.from(this.list.querySelectorAll<HTMLLIElement>('.combo__option'));

    this.options.forEach(li => li.setAttribute('tabindex', '-1'));

    this.syncSelected();

    this.attach();
  }

  private attach() {
    this.btn.addEventListener('click', () => this.toggle());

    this.btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.open();
        const idx = this.indexOfCurrent();
        this.focusOption(idx >= 0 ? idx : 0);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape') {
        this.close();
      }
    });

    this.options.forEach((li, i) => {
      li.addEventListener('click', () => {
        const v = Number(li.dataset.value ?? li.textContent ?? 0);
        this.select(v);
        this.close();
        this.btn.focus();
      });
      li.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); this.focusOption(Math.min(i + 1, this.options.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); this.focusOption(Math.max(i - 1, 0)); }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
        else if (e.key === 'Escape') { e.preventDefault(); this.close(); this.btn.focus(); }
      });
    });

    document.addEventListener('mousedown', (e) => {
      if (!this.root.contains(e.target as Node)) this.close();
    });
  }

  private open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.list.hidden = false;
    this.btn.setAttribute('aria-expanded', 'true');
  }

  private close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.list.hidden = true;
    this.btn.setAttribute('aria-expanded', 'false');
  }

  private toggle() { this.isOpen ? this.close() : this.open(); }

  private indexOfCurrent(): number {
    const curr = String(this.value());
    return this.options.findIndex(li => (li.dataset.value ?? li.textContent) === curr);
  }

  private focusOption(i: number) { this.options[i]?.focus(); }

  private syncSelected() {
    const v = this.value();
    this.options.forEach(li => li.removeAttribute('aria-selected'));
    const match = this.options.find(li => Number(li.dataset.value ?? li.textContent ?? 0) === v);
    if (match) match.setAttribute('aria-selected', 'true');
  }

  private setVisualValue(v: number) {
    this.valueEl.dataset.value = String(v);
    this.valueEl.textContent = pad2(v);
    this.syncSelected();
  }

  private select(v: number) {
    const n = Math.round(v);
    this.setVisualValue(n);
    this.onChange({ mode: this.mode, value: n });
  }

  private value(): number {
    return Number(this.valueEl.dataset.value ?? this.valueEl.textContent ?? 0);
  }
}

export function initComboboxes(onChange: ComboChange) {
  document.querySelectorAll<HTMLElement>('.combo').forEach(node => {
    new Combobox(node, onChange);
  });
}
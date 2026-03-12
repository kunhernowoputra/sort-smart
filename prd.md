# PRD: SortSmart AI
**Platform AI untuk Sortasi Sampah & Circular Economy Indonesia**

---

## Metadata

| Field | Value |
|-------|-------|
| Product Name | SortSmart AI |
| Version | 1.0 |
| Status | DRAFT |
| Author | AI Product Owner |
| Date | Maret 2025 |
| Target Market | B2B — Indonesia |
| Primary Segment | FMCG Pabrik Besar, Industri F&B |
| Secondary Segment | Pemerintah Kota / TPA Tier-1 |

---

## 1. Problem Statement

### Context
- Indonesia menghasilkan **~68 juta ton sampah/tahun**, tumbuh ~5% YoY
- Tingkat daur ulang nasional **< 10%** — jauh di bawah rata-rata ASEAN
- Regulasi **Extended Producer Responsibility (EPR)** mulai berlaku
- Tekanan ESG dari investor global mendorong industri cari solusi terukur

### Pain Points

#### Segmen 1: Industri FMCG & Manufaktur
- Sortasi manual tidak konsisten dan tidak scalable
- Data recovery material tidak akurat → pelaporan ESG sulit diaudit
- Risiko denda EPR tanpa sistem compliance yang andal
- Tidak ada audit trail yang dipercaya investor dan induk perusahaan MNC

#### Segmen 2: Pemerintah Kota / Dinas LH
- Kapasitas sortir TPA di bawah volume sampah masuk
- Keterbatasan anggaran untuk tenaga kerja skala besar
- Tidak ada data real-time untuk perencanaan kapasitas

#### Segmen 3: Industri Hilir (Buyer Material Daur Ulang)
- Kualitas material daur ulang tidak konsisten dari supplier
- Tidak ada marketplace terpercaya untuk transaksi material recycle B2B

---

## 2. Product Vision

> **"Menjadi infrastruktur data dan AI terpercaya untuk circular economy Indonesia — memungkinkan setiap ton sampah menjadi sumber daya bernilai."**

### Positioning Statement
- **Untuk:** Manajer ESG di perusahaan FMCG MNC dan Kepala Dinas LH kota tier-1
- **Yang membutuhkan:** Solusi sortasi otomatis yang terukur dan menghasilkan data ESG yang dapat diaudit
- **SortSmart AI adalah:** Platform AI-powered waste management SaaS (asset-light)
- **Berbeda dari:** Kontraktor pengelolaan sampah konvensional dan solusi hardware murni
- **Karena:** Software layer + data analytics + compliance reporting dalam satu ekosistem terintegrasi

---

## 3. Target Users

### Primary Persona: Sustainability Manager (FMCG)
```
Jabatan  : ESG/CSR Manager, perusahaan FMCG MNC
Goal     : Capai ESG target, hindari denda EPR
Pain     : Data daur ulang tidak akurat, proses manual
Trigger  : Audit ESG dari induk perusahaan multinasional
```

### Secondary Persona: Kepala TPA / Dinas LH
```
Jabatan  : Kepala Dinas Lingkungan Hidup Kota
Goal     : Kurangi volume sampah non-recycle di TPA
Pain     : Tenaga sortir terbatas, hasil inkonsisten
Trigger  : Tekanan regulasi dari pemerintah pusat
```

---

## 4. Product Scope & Features

### MoSCoW Prioritization

#### MUST HAVE — Phase 1 (0-12 bulan)

**F1: Computer Vision (CV) Waste Sorter Engine**
- Deteksi dan klasifikasi otomatis >20 kategori material (PET, HDPE, kertas, logam, organik, dll.)
- Target akurasi: ≥90% (Phase 1), ≥95% (Phase 2)
- Dukungan kamera HD + infrared untuk berbagai kondisi pencahayaan
- Latensi pemrosesan real-time: <200ms per frame
- Input: video stream dari kamera conveyor belt
- Output: label kategori + confidence score + koordinat bounding box

**F2: Real-time Dashboard Analytics**
- Visualisasi komposisi sampah per jam / hari / minggu
- Recovery rate per kategori material
- Throughput & efficiency metrics per lini produksi
- Alert otomatis jika akurasi turun di bawah threshold yang dikonfigurasi
- Role-based access: Operator, Supervisor, Management

**F3: Waste Classification API**
- REST API untuk integrasi dengan sistem klien (ERP, MES, SCADA)
- Endpoint: `POST /classify` — terima gambar, kembalikan label + confidence
- Endpoint: `GET /report` — tarik data agregat per periode
- API Key authentication + rate limiting
- SLA uptime: 99.5%

**F4: ESG & Compliance Report Generator**
- Template laporan sesuai format EPR Indonesia (KLHK)
- Export ke PDF, Excel, dan format standar GRI
- Audit trail dengan timestamp dan digital signature
- Integrasi framework ESG: GHG Protocol, Science Based Targets
- Jadwal pengiriman otomatis ke stakeholder (email)

---

#### SHOULD HAVE — Phase 2 (12-24 bulan)

**F5: Multi-site Management Platform**
- Dashboard terpusat untuk kelola banyak lokasi sekaligus
- Perbandingan performa antar site
- Centralized user management & permission

**F6: Predictive Waste Volume Forecasting**
- Model prediksi volume sampah 7/30/90 hari ke depan
- Input: data historis + faktor eksternal (musim, event, produksi)
- Output: rekomendasi kapasitas & staffing

**F7: Carbon Credit Calculation Engine**
- Kalkulasi otomatis potensi carbon credit dari material yang berhasil didaur ulang
- Mapping ke standar: Gold Standard, Verra VCS
- Output laporan untuk proses sertifikasi

---

#### NICE TO HAVE — Phase 3 (24-48 bulan)

**F8: Material Marketplace B2B**
- Listing material daur ulang terverifikasi dari jaringan klien
- Matching engine antara seller (pabrik) dan buyer (industri recycle)
- Escrow payment + logistics coordination
- Revenue model: komisi 3-8% per transaksi

**F9: White-label SaaS untuk Pemerintah Daerah**
- Versi platform yang dapat di-brand ulang oleh Pemda
- Modul khusus: pelaporan ke KLHK, integrasi SIMBARA
- Kontrak Government: project-based + maintenance fee

---

## 5. Technical Requirements

### Architecture (Asset-Light Principle)
```
[Kamera/Sensor Klien]
        ↓
[Edge Processing Unit] ← partner hardware lokal
        ↓ (stream/batch)
[SortSmart AI Cloud]
  ├── CV Inference Service (GPU)
  ├── Analytics Engine
  ├── Report Generator
  └── API Gateway
        ↓
[Client Dashboard / ERP / ESG Tools]
```

### Non-Functional Requirements
| Requirement | Target |
|-------------|--------|
| Akurasi CV model | ≥90% Phase 1, ≥95% Phase 2 |
| Latensi inference | <200ms per frame |
| API uptime SLA | 99.5% |
| Data retention | 3 tahun (untuk audit) |
| Keamanan data | Enkripsi at-rest + in-transit (AES-256, TLS 1.3) |
| Skalabilitas | Support hingga 100 site concurrent |
| Bahasa antarmuka | Bahasa Indonesia + English |

### Integrasi Prioritas
- SAP S/4HANA (modul EHS & Sustainability)
- Oracle ERP
- SCADA/MES via OPC-UA atau REST
- Email (SMTP) untuk report delivery
- Cloud: AWS Jakarta (primary), GCP sebagai fallback

---

## 6. Business Model

### Revenue Streams
| Stream | Model | Estimasi |
|--------|-------|----------|
| SaaS Subscription | Monthly/Annual per site | Rp 25-120 jt/bln tergantung paket |
| Revenue Share Material | % dari nilai material terjual | 3-8% per transaksi |
| Carbon Credit Fee | % dari nilai kredit + advisory | Negosiasi per klien |
| Government Contract | Project-based + maintenance | Rp 500 jt - 5 M per proyek |

### Pricing Tiers (Phase 1 Indikatif)
```
STARTER    — 1 site, 1 lini sortasi              → Rp 25-40 jt/bulan
PROFESSIONAL — 1 site, 3-5 lini + ESG Report     → Rp 75-120 jt/bulan
ENTERPRISE  — Multi-site + custom integrasi       → Negosiasi
```

---

## 7. Go-to-Market Strategy

### Phase 1: Pilot (0-12 bulan)
- Target: 2-3 pabrik FMCG besar dengan ESG mandate dari induk MNC
- Taktik: Free pilot 3 bulan → convert ke kontrak 12 bulan
- Kota: Jakarta, Surabaya (fokus awal)
- Key message: "Audit ESG Anda siap dalam 8 minggu, bukan 8 bulan"

### Phase 2: Scale (12-24 bulan)
- Ekspansi ke TPA kota tier-1 + industri F&B dan tekstil
- Upsell modul carbon credit ke klien existing
- Target: 15+ klien aktif

### Phase 3: Expand (24-48 bulan)
- Marketplace material daur ulang
- Ekspansi regional: Vietnam, Malaysia (regulasi EPR serupa)
- White-label untuk Pemda

---

## 8. Success Metrics & KPI

| Metrik | Baseline | Target 12 bln | Target 24 bln |
|--------|----------|---------------|---------------|
| Akurasi Sortir AI | <70% (manual) | ≥90% | ≥95% |
| Waktu Proses/Ton | 4-6 jam | <2 jam | <1 jam |
| Recovery Rate Material | <40% | ≥60% | ≥75% |
| Jumlah Klien Aktif | 0 | 3 pilot | 15+ |
| Monthly Recurring Revenue | 0 | Rp 150 jt | Rp 1 M+ |
| NPS Score | - | ≥40 | ≥60 |
| Churn Rate | - | <5%/tahun | <3%/tahun |

---

## 9. Risks & Mitigation

| Risiko | Level | Mitigasi |
|--------|-------|----------|
| Capex hardware tinggi | 🔴 TINGGI | Model leasing/as-a-service; partner manufaktur lokal |
| Infrastruktur tidak merata | 🟡 SEDANG | Fokus kota Tier-1: Jakarta, Surabaya, Bandung |
| Edukasi pasar lambat | 🟡 SEDANG | Pilot gratis 3 bulan + ROI calculator tool |
| Kompetisi solusi manual murah | 🟡 SEDANG | Posisikan sebagai ROI jangka panjang, bukan biaya |
| Perubahan regulasi EPR | 🟡 SEDANG | Bangun relasi dengan KLHK & BRIN sejak awal |
| Akurasi model kurang di data Indonesia | 🟡 SEDANG | Dataset lokal 5.000+ sampel sebelum go-live |

---

## 10. Assumptions & Dependencies

### Critical Assumptions
1. Klien pilot bersedia memberikan akses ke lini produksi untuk integrasi kamera
2. Regulasi EPR Indonesia tetap berjalan sesuai jadwal
3. Tersedia partner hardware lokal (integrator kamera/robotik) dengan harga kompetitif
4. Model CV dapat mencapai akurasi >85% dalam 3 bulan training awal dengan data lokal
5. Minimal 2-3 perusahaan FMCG bersedia jadi early adopter dengan kontrak 12 bulan

### External Dependencies
- **Regulasi:** Peraturan teknis EPR dari KLHK sudah final
- **Cloud:** Ketersediaan GPU instance di AWS Jakarta / GCP untuk inference
- **Hardware:** Minimal 1 partner integrator kamera lokal terverifikasi
- **Data:** Akses dataset sampah Indonesia ~5.000 sampel untuk training awal

---

## 11. Next Steps (30 Hari Pertama)

### Aksi Prioritas
1. **Customer Discovery** — Interview 10 Sustainability Manager di FMCG tier-1
2. **Technical PoC** — Validasi akurasi CV model dengan 5.000 sampel sampah Indonesia
3. **Partner Mapping** — Identifikasi 3-5 calon partner integrator hardware lokal
4. **Regulatory Deep-dive** — Konsultasi KLHK terkait format laporan EPR yang diterima
5. **Financial Model** — Buat detail unit economics dan proyeksi 3 tahun

### Open Questions
- Apakah klien FMCG bersedia bayar untuk compliance reporting saja tanpa sortasi otomatis?
- Berapa threshold akurasi minimum yang dapat diterima klien untuk replace proses manual?
- Bagaimana model revenue share material distrukturisasi secara legal?
- Apakah perlu lisensi khusus dari KLHK untuk menerbitkan carbon credit?

---

## Appendix: Glossary

| Term | Definisi |
|------|----------|
| EPR | Extended Producer Responsibility — regulasi mewajibkan produsen bertanggung jawab atas daur ulang produk mereka |
| CV Engine | Computer Vision Engine — sistem AI untuk deteksi dan klasifikasi visual material sampah |
| Recovery Rate | Persentase material yang berhasil dipulihkan (daur ulang) dari total input sampah |
| GRI | Global Reporting Initiative — standar internasional untuk sustainability reporting |
| TPA | Tempat Pemrosesan Akhir — fasilitas pengelolaan akhir sampah milik pemerintah kota |
| MRR | Monthly Recurring Revenue — pendapatan berulang bulanan dari subscription |
| NPS | Net Promoter Score — metrik kepuasan dan loyalitas pelanggan |
| SaaS | Software as a Service — model distribusi software berbasis cloud subscription |
| Asset-light | Strategi bisnis yang meminimalkan kepemilikan aset fisik, fokus pada software & data |

---

*PRD Version 1.0 — SortSmart AI — Confidential & Proprietary*
<section class="contact-section" id="contact">
    <div class="contact-bg"></div>
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <div class="section-tag">Hubungi Kami</div>
            <h2 class="section-title">Siap <span class="text-accent">Berkolaborasi</span>?</h2>
            <p class="section-subtitle">Konsultasikan kebutuhan IT Anda dengan tim kami. Kami siap memberikan solusi terbaik.</p>
        </div>

        <div class="contact-grid">
            <div class="contact-info" data-aos="fade-right">
                <div class="contact-info-item">
                    <div class="ci-icon"><i class="fas fa-map-marker-alt"></i></div>
                    <div class="ci-content">
                        <h4>Alamat Kantor</h4>
                        <p>Jl. Rawabening Perum. Permata Bening Thp. 7 Blok C9<br>Pekanbaru - Riau, Indonesia</p>
                    </div>
                </div>
                <div class="contact-info-item">
                    <div class="ci-icon"><i class="fab fa-whatsapp"></i></div>
                    <div class="ci-content">
                        <h4>WhatsApp</h4>
                        <a href="https://wa.me/6281276627100">0812 7662 7100</a>
                    </div>
                </div>
                <div class="contact-info-item">
                    <div class="ci-icon"><i class="fas fa-envelope"></i></div>
                    <div class="ci-content">
                        <h4>Email</h4>
                        <a href="mailto:admin@lenteracs.co.id">admin@lenteracs.co.id</a>
                        <a href="mailto:marioacil@gmail.com">marioacil@gmail.com</a>
                    </div>
                </div>
                <div class="contact-info-item">
                    <div class="ci-icon"><i class="fas fa-globe"></i></div>
                    <div class="ci-content">
                        <h4>Website</h4>
                        <a href="https://lenteracs.co.id" target="_blank">https://lenteracs.co.id</a>
                    </div>
                </div>

                <div class="contact-cta-whatsapp">
                    <a href="https://wa.me/6281276627100?text=Halo%20LCS%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20IT%20kami." target="_blank" class="btn-whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        Chat Langsung di WhatsApp
                    </a>
                </div>
            </div>

            <div class="contact-form-wrap" data-aos="fade-left">
                <form class="contact-form" action="{{ route('contact.send') }}" method="POST">
                    @csrf
                    <div class="form-group">
                        <label for="name">Nama Lengkap</label>
                        <div class="input-wrap">
                            <i class="fas fa-user"></i>
                            <input type="text" id="name" name="name" placeholder="Nama Anda" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="organization">Instansi / Perusahaan</label>
                        <div class="input-wrap">
                            <i class="fas fa-building"></i>
                            <input type="text" id="organization" name="organization" placeholder="Nama instansi Anda">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <div class="input-wrap">
                                <i class="fas fa-envelope"></i>
                                <input type="email" id="email" name="email" placeholder="email@anda.com" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="phone">No. WhatsApp</label>
                            <div class="input-wrap">
                                <i class="fab fa-whatsapp"></i>
                                <input type="tel" id="phone" name="phone" placeholder="08xx xxxx xxxx">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="service">Layanan yang Dibutuhkan</label>
                        <div class="input-wrap select-wrap">
                            <i class="fas fa-list"></i>
                            <select id="service" name="service">
                                <option value="">Pilih layanan...</option>
                                <option value="software">Software & Database Application</option>
                                <option value="gis">Geographic Information System (GIS)</option>
                                <option value="ecommerce">E-Commerce & Multimedia Design</option>
                                <option value="network">Network Design & Architecture</option>
                                <option value="recovery">Data Recovery & Backup</option>
                                <option value="maintenance">Service Agreement Maintenance</option>
                                <option value="marketing">Digital Marketing</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="message">Deskripsi Kebutuhan</label>
                        <div class="input-wrap textarea-wrap">
                            <textarea id="message" name="message" rows="4" placeholder="Ceritakan kebutuhan IT Anda..." required></textarea>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full">
                        <span>Kirim Pesan</span>
                        <i class="fas fa-paper-plane"></i>
                    </button>

                    @if(session('success'))
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        {{ session('success') }}
                    </div>
                    @endif
                </form>
            </div>
        </div>
    </div>
</section>
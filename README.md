# 📰 Tech News Dashboard

Tech News Dashboard; **Dev.to** ve **Hacker News** gibi popüler platformlardan en güncel teknoloji ve yazılım haberlerini tek bir arayüzde toplayan modern bir web uygulamasıdır.

Bu proje **React**, **TypeScript** ve **Vite** kullanılarak geliştirilmiş; **Redux Toolkit** ile durum yönetimi sağlanmış ve **Tailwind CSS** ile modern bir arayüz tasarlanmıştır.

## 🚀 Özellikler

* **Çoklu Kaynak Desteği:**  Dev.to ve Hacker News üzerinden en son gönderileri çeker.
* **Anlık Arama:** Arama çubuğu ile tüm platformlarda eş zamanlı içerik araması yapabilirsiniz.
* **Favorilere Ekleme:** Beğendiğiniz haberleri favorilere ekleyebilir ve daha sonra okuyabilirsiniz (Local Storage ile tarayıcıda saklanır).
* **Karanlık & Aydınlık Mod:** Göz yormayan Karanlık (Dark) ve Aydınlık (Light) tema seçenekleri arasında tek tıkla geçiş yapabilirsiniz.
* **Modern & Responsive Tasarım:** Tailwind CSS ile oluşturulmuş, her cihazda (mobil, tablet, masaüstü) kusursuz görünen arayüz.
* **Performanslı:** Vite ve React ile ışık hızında yükleme ve çalışma performansı.

## 🛠️ Kullanılan Teknolojiler

* **[React](https://react.dev/)** - Kullanıcı arayüzü kütüphanesi
* **[TypeScript](https://www.typescriptlang.org/)** - Tip güvenliği için
* **[Vite](https://vitejs.dev/)** - Hızlı geliştirme ve build aracı
* **[Redux Toolkit](https://redux-toolkit.js.org/)** - Global state yönetimi
* **[Tailwind CSS](https://tailwindcss.com/)** - Stil ve tasarım
* **[React Router](https://reactrouter.com/)** - Sayfa yönlendirmeleri

## 📦 Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Projeyi Klonlayın:**
    ```bash
    git clone https://github.com/Erdem-Baran/tech-news-app.git
    cd tech-news-app
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    npm install
    # veya
    yarn install
    ```

3.  **Geliştirme Sunucusunu Başlatın:**
    ```bash
    npm run dev
    # veya
    yarn dev
    ```

4.  **Tarayıcıda Açın:**
    Terminalde gösterilen adrese (genellikle `http://localhost:5173`) gidin.

## 📂 Proje Yapısı

```text
src/
├── components/      # Tekrar kullanılabilir bileşenler (PostCards, ThemeToggle vb.)
├── hooks/           # Custom hook'lar (useTheme, useDebounce, ReduxHooks)
├── layout/          # Ana sayfa düzeni (MainLayout)
├── pages/           # Sayfa bileşenleri (Home, Favorites vb.)
├── redux/           # Redux store ve slice dosyaları
├── services/        # API isteklerini yöneten servisler
├── types/           # TypeScript tip tanımlamaları
├── utils/           # Yardımcı fonksiyonlar (Tarih formatlama vb.)
└── main.tsx         # Uygulamanın giriş noktası
```

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Herhangi bir hata bulursanız veya yeni bir özellik eklemek isterseniz:

1.  Bu repoyu Fork'layın.
2.  Yeni bir branch oluşturun (`git checkout -b feature/yeni-ozellik`).
3.  Değişikliklerinizi commit yapın (`git commit -m 'Yeni özellik eklendi'`).
4.  Branch'inizi pushlayın (`git push origin feature/yeni-ozellik`).
5.  Bir **Pull Request** oluşturun.

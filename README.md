# Wyszukiwarka Książek (OpenLibrary)

Prosta aplikacja React (Vite + TypeScript) do wyszukiwania książek przy użyciu API OpenLibrary.

## Funkcje
- Wyszukiwanie po tytule / autorze (pole ogólne `q`)
- Debounce zapytania (redukcja liczby requestów)
- Paginacja wyników
- Podgląd szczegółów wybranej pozycji (opis, tematy, okładka)
- Obsługa błędów i stan ładowania
- Responsywny layout + tryb dark (prefers-color-scheme)

## Szybki start lokalnie

Wymagany Node.js (>= 18).

```bash
npm install
npm run dev
```

Otwórz: http://localhost:5173

## Budowanie
```bash
npm run build
npm run preview
```

## Struktura
```
src/
	api.ts        # Zapytania do OpenLibrary
	types.ts      # Typy odpowiedzi
	App.tsx       # Główny komponent
	main.tsx      # Punkt wejścia
	styles.css    # Style globalne
	hooks/useDebounce.ts
	components/   # Komponenty UI (SearchBar, BookCard, Pagination, BookModal)
```

## Deploy na GitHub Pages (CI)
Workflow `.github/workflows/deploy.yml`:
- Trigger: push na `main` lub ręcznie
- Kroki: instalacja, build, upload artefaktu, publikacja na Pages
- Wymaga w repo ustawienia GitHub Pages → źródło: *GitHub Actions*

Jeśli repo jest projektem (nie `username.github.io`), ścieżka aplikacji będzie:
```
https://<twoj-username>.github.io/workshops-17-11/
```

W pliku `vite.config.ts` ustawiono `base: '/workshops-17-11/'`.

## Dostosowanie
- Zmiana limitu wyników: stała `LIMIT` w `App.tsx`
- Dodanie filtrów: rozszerz formularz i dopisz parametry w `searchBooks()`

## Licencja
Brak przypisanej – używaj dowolnie w celach edukacyjnych.

# Dokumentacja strony Śmietnikomatu

## Spis treści
1. [Opis aplikacji](#opis-aplikacji)
2. [Opis funkcjonalności](#opis-funkcjonalności)
3. [Dane do logowania](#dane-do-logowania)

## Opis aplikacji 
Aplikacja "Śmietnikomat" to kompleksowe narzędzie dedykowane zarządzaniu systemem altan śmietnikowych. Jest to platforma internetowa, która umożliwia interakcję między różnymi podmiotami, takimi jak użytkownicy indywidualni, urzędnicy, firmy, spółdzielnie mieszkaniowe oraz administratorzy.

Całość systemu działa na zasadzie gmin. Użytkownicy indywidualni przypisywani są do gmin. Następnie urzędnicy i superUrzędnicy oraz admini z konkretnej gminy mogą zarządzać kontami użytkowników. Firmy i spółdzielnie są niemal autonomicznymi bytami.

Dostęp do altan śmietnikowych jest możliwy za pomocą kart dostępu.

Aplikacja zapewnia bezpieczne logowanie, kontrolę dostępu do danych oraz interfejs użytkownika zaprojektowany w sposób intuicyjny i przyjazny dla użytkownika końcowego. Dzięki temu, wszystkie zaangażowane strony mogą efektywnie zarządzać systemem altan śmietnikowych, monitorować statystyki i podejmować odpowiednie działania w celu utrzymania porządku i efektywnego zarządzania odpadami.

## Opis funkcjonalności 

### Użytkownik indywidualny
- Może podglądać wyrzucone przez siebie śmieci, karty do obsługi altany śmietnikowej, umowy, dane profilowe oraz historię zgłoszonych wniosków.
- Nie ma możliwości samodzielnego dodawania sobie kart/umów - wszystko jest wysyłane do odpowiedniej gminy, gdzie musi to potwierdzić urzędnik.
- Może jedynie zablokować kartę, anulować wniosek oraz zmienić email, numer telefonu oraz hasło.

### Urzędnik
- Akceptuje lub odrzuca wnioski użytkowników.
- Może wyszukiwać wszystkich użytkowników zamieszkujących jego gminę lub mających w niej przynajmniej jeden ze swoich adresów.
- Ma możliwość edycji danych użytkowników i zablokowania konta.
- Posiada podgląd altan znajdujących się w gminie wraz z listą przypisanych umów.

### SuperUrzędnik
- Ma takie same uprawnienia jak urzędnik.
- Może dodatkowo tworzyć nowe konta urzędników w swojej gminie.

### Firma
- Oprócz podglądu statystyk oraz swoich danych, ma również podgląd posiadanych altan oraz kart dostępu.
- Ma możliwość zmiany swoich danych oraz przypisywania dostępów do swoich altan śmietnikowych do posiadanych kart.
- Może złożyć wniosek o przysłanie pakietu nowych kart.

### Spółdzielnia mieszkaniowa
- Podobna do firmy, lecz dodatkowo posiada możliwość przypisywania swoich lokatorów do siebie.
- Posiada własne karty, które wypożycza swoim lokatorom.

### Administrator
- Posiada możliwość dodawania altan śmietnikowych do systemu oraz przypisywania ich konkretnym podmiotom.
- Tworzy konta superUrzędników oraz zatwierdza wnioski o wysłanie pakietów kart.

## Dane do logowania
Wszystkie konta mają hasło: qqqqqqq1

**Loginy użytkowników:**
- użytkownik indywidualny: uzytkownik@kratki.com
- urzędnik: urzednik@kratki.com
- superUrzędnik: superurzednik@kratki.com
- firma: firma@kratki.com
- spółdzielnia mieszkaniowa: spoldzielnia@kratki.com

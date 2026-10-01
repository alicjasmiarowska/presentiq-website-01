# Kontaktformular: Einrichtung in Microsoft 365

Das Kontaktformular auf presentiq.de versendet Anfragen über **Microsoft Graph**
direkt aus Ihrem Microsoft-365-Postfach. Die Nachrichten kommen damit wie eine
normale E-Mail in Outlook an, landen nicht im Spam (Absender ist Ihr eigener
Exchange-Server) und liegen zusätzlich unter „Gesendete Elemente“. Ein Klick
auf **Antworten** geht direkt an die Person, die das Formular ausgefüllt hat.

Dafür braucht die Website eine eigene App-Registrierung in Ihrem Microsoft 365.
Die Einrichtung dauert ca. 15 Minuten und erfordert eine Person mit
Administratorrechten (Globaler Administrator oder Anwendungsadministrator +
Exchange-Administrator).

> Ein SMTP-Zugang mit Benutzername und Passwort ist **nicht** möglich:
> Microsoft hat die Standardauthentifizierung für SMTP in Exchange Online
> abgeschaltet.

---

## 1. Postfach festlegen

- **Absender:** das Postfach, aus dem die Website sendet, z. B.
  `kontakt@presentiq.de`. Ein freigegebenes Postfach (Shared Mailbox) genügt
  und braucht keine eigene Lizenz.
- **Empfänger:** wer die Anfragen bekommt. Standard ist dasselbe Postfach;
  mehrere Adressen sind möglich.

## 2. App registrieren

1. <https://entra.microsoft.com> → **Identität → Anwendungen → App-Registrierungen → Neue Registrierung**
2. Name: `Presentiq Website – Kontaktformular`
3. Unterstützte Kontotypen: **Nur Konten in diesem Organisationsverzeichnis**
4. Umleitungs-URI: leer lassen → **Registrieren**
5. Auf der Übersichtsseite notieren:
   - **Anwendungs-ID (Client-ID)**
   - **Verzeichnis-ID (Mandanten-ID)**

## 3. Geheimen Schlüssel erstellen

1. In der App: **Zertifikate & Geheimnisse → Neuer geheimer Clientschlüssel**
2. Beschreibung: `Website`, Gültigkeit: **24 Monate**
3. Den **Wert** sofort kopieren (er wird nur einmal angezeigt).
4. **Ablaufdatum im Kalender eintragen.** Läuft der Schlüssel ab, kann das
   Formular nicht mehr senden. Besucher sehen dann einen Hinweis mit Ihrer
   E-Mail-Adresse, damit keine Anfrage verloren geht. Rechtzeitig einen neuen
   Schlüssel erstellen und uns schicken.

## 4. Senderecht vergeben – nur für ein Postfach

Empfohlen ist, der App das Senderecht **nur für das Absender-Postfach** zu
geben (RBAC für Anwendungen in Exchange Online). So kann die Website nicht im
Namen anderer Mitarbeitender senden.

> Wichtig: Bei diesem Weg in Entra **keine** API-Berechtigung „Mail.Send“
> hinzufügen. Eine dort erteilte Berechtigung gilt für alle Postfächer und
> würde die Einschränkung aufheben.

In der Exchange Online PowerShell:

```powershell
Connect-ExchangeOnline

# Objekt-ID: entra.microsoft.com → Unternehmensanwendungen →
# "Presentiq Website – Kontaktformular" → Objekt-ID
New-ServicePrincipal -AppId <CLIENT-ID> -ObjectId <OBJEKT-ID> -DisplayName "Presentiq Website"

New-ManagementScope -Name "Presentiq Kontaktformular" `
  -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'kontakt@presentiq.de'"

New-ManagementRoleAssignment -App <CLIENT-ID> -Role "Application Mail.Send" `
  -CustomResourceScope "Presentiq Kontaktformular"

# Prüfen: muss für kontakt@presentiq.de "InScope = True" zeigen
Test-ServicePrincipalAuthorization -Identity <CLIENT-ID> -Resource kontakt@presentiq.de
```

## 5. Daten an uns übermitteln

Bitte über einen sicheren Weg (z. B. Passwort-Manager-Freigabe oder telefonisch),
**nicht** im Klartext per E-Mail:

| Was | Wo zu finden |
| --- | --- |
| Mandanten-ID | Schritt 2 |
| Client-ID | Schritt 2 |
| Geheimer Schlüssel (Wert) | Schritt 3 |
| Absender-Postfach | Schritt 1 |
| Empfänger-Adresse(n) | Schritt 1 |

Wir hinterlegen die Daten beim Hosting der Website und senden eine
Testanfrage.

## 6. Datenschutz

Bitte prüfen Sie, ob Ihre Datenschutzerklärung das Kontaktformular abdeckt:
Zweck (Bearbeitung der Anfrage), Rechtsgrundlage, Speicherung der Anfrage in
Ihrem Microsoft-365-Postfach (Microsoft als Auftragsverarbeiter) und
Speicherdauer. Die Website selbst speichert keine Formulardaten.

---

## Für Entwickler

Umgebungsvariablen (beim Hosting, z. B. Vercel → Settings → Environment
Variables, dann neu deployen):

```
MS_GRAPH_TENANT_ID=     # Mandanten-ID
MS_GRAPH_CLIENT_ID=     # Client-ID
MS_GRAPH_CLIENT_SECRET= # geheimer Schlüssel (Wert)
CONTACT_FROM=kontakt@presentiq.de
CONTACT_TO=kontakt@presentiq.de   # optional, kommagetrennt
```

- Code: `src/lib/mail/graph.ts` (Versand), `app/[locale]/contact/actions.ts`
  (Server Action: Validierung, Spam-Schutz, E-Mail-Inhalt).
- Ohne diese Variablen wird lokal (`npm run dev`) nichts versendet; die
  Nachricht erscheint im Terminal. In Produktion zeigt das Formular dann
  einen Fehler mit der E-Mail-Adresse, Details stehen in den Server-Logs.
- Spam-Schutz: verstecktes Honeypot-Feld, Mindestausfüllzeit 3 s, max.
  5 Anfragen pro IP in 10 Minuten.

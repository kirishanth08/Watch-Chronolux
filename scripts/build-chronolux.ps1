$Root = "C:\Users\Lenovo\Desktop\watch repair"
$ImgDir = Join-Path $Root "assets\images"
$PagesDir = Join-Path $Root "pages"

New-Item -ItemType Directory -Force -Path $ImgDir | Out-Null

$Images = @{
  "hero-watch.webp" = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1920&fm=webp&q=85"
  "luxury-watch-large.webp" = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&fm=webp&q=85"
  "luxury-watch-card.webp" = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&fm=webp&q=85"
  "luxury-watch-thumb.webp" = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=140&fm=webp&q=85"
  "watch-movement.webp" = "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&fm=webp&q=85"
  "watch-movement-thumb.webp" = "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=140&fm=webp&q=85"
  "diamond-ring.webp" = "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&fm=webp&q=85"
  "diamond-ring-thumb.webp" = "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=140&fm=webp&q=85"
  "gold-chain.webp" = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&fm=webp&q=85"
  "dive-watch.webp" = "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&fm=webp&q=85"
  "dive-watch-thumb.webp" = "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=140&fm=webp&q=85"
  "vintage-watch-tools.webp" = "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&fm=webp&q=85"
  "vintage-watch-card.webp" = "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&fm=webp&q=85"
  "author-portrait.webp" = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&fm=webp&q=85"
  "author-portrait-sm.webp" = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&fm=webp&q=85"
  "team-clara.webp" = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&fm=webp&q=85"
  "team-marcus.webp" = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&fm=webp&q=85"
  "team-elena.webp" = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&fm=webp&q=85"
  "workshop-interior.webp" = "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800&fm=webp&q=85"
  "watch-servicing-banner.webp" = "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&fm=webp&q=85"
  "watch-before-service.webp" = "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&fm=webp&q=85"
  "watch-after-service.webp" = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fm=webp&q=85"
  "jewellery-display.webp" = "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&fm=webp&q=85"
  "fine-jewellery.webp" = "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&fm=webp&q=85"
}

Write-Host "=== Downloading images ==="
foreach ($entry in $Images.GetEnumerator()) {
  $out = Join-Path $ImgDir $entry.Key
  curl.exe -L -s -o $out $entry.Value
  $size = (Get-Item $out).Length
  Write-Host "$($entry.Key): $size bytes"
}

$Replacements = [ordered]@{
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1920&fm=webp&q=80' = '../assets/images/hero-watch.webp'
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&fm=webp&q=80' = '../assets/images/luxury-watch-large.webp'
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&fm=webp&q=80' = '../assets/images/luxury-watch-card.webp'
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=140&fm=webp&q=80' = '../assets/images/luxury-watch-thumb.webp'
  'https://images.unsplash.com/photo-1614164185128-e4ec99c436d6?w=600&fm=webp&q=80' = '../assets/images/watch-movement.webp'
  'https://images.unsplash.com/photo-1614164185128-e4ec99c436d6?w=140&fm=webp&q=80' = '../assets/images/watch-movement-thumb.webp'
  'https://images.unsplash.com/photo-1515562141203-7a88fb7ce338?w=600&fm=webp&q=80' = '../assets/images/diamond-ring.webp'
  'https://images.unsplash.com/photo-1515562141203-7a88fb7ce338?w=140&fm=webp&q=80' = '../assets/images/diamond-ring-thumb.webp'
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&fm=webp&q=80' = '../assets/images/gold-chain.webp'
  'https://images.unsplash.com/photo-1547996160-81dfaaea50a5?w=600&fm=webp&q=80' = '../assets/images/dive-watch.webp'
  'https://images.unsplash.com/photo-1547996160-81dfaaea50a5?w=140&fm=webp&q=80' = '../assets/images/dive-watch-thumb.webp'
  'https://images.unsplash.com/photo-1612817159947-19598d9e846e?w=800&fm=webp&q=80' = '../assets/images/vintage-watch-tools.webp'
  'https://images.unsplash.com/photo-1612817159947-19598d9e846e?w=600&fm=webp&q=80' = '../assets/images/vintage-watch-card.webp'
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&fm=webp&q=80' = '../assets/images/author-portrait.webp'
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&fm=webp&q=80' = '../assets/images/author-portrait-sm.webp'
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&fm=webp&q=80' = '../assets/images/team-clara.webp'
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&fm=webp&q=80' = '../assets/images/team-marcus.webp'
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&fm=webp&q=80' = '../assets/images/team-elena.webp'
  'https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800&fm=webp&q=80' = '../assets/images/workshop-interior.webp'
  'https://images.unsplash.com/photo-1614164185128-eb6bd0f5e62e?w=1920&fm=webp&q=80' = '../assets/images/watch-servicing-banner.webp'
  'https://images.unsplash.com/photo-1587836374828-4dbafa94a0d2?w=800&fm=webp&q=80' = '../assets/images/watch-before-service.webp'
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fm=webp&q=80' = '../assets/images/watch-after-service.webp'
  'TimeCraft Repairs' = 'ChronoLux'
  'timecraftrepairs.com' = 'chronolux.com'
  'hello@timecraftrepairs.com' = 'hello@chronolux.com'
  '42 Horology Lane' = '48 Bond Street'
  'EC1A 1BB' = 'W1S 4QT'
  'Horology Lane' = 'Bond Street'
  'fas fa-clock me-2' = 'fas fa-gem me-2'
  'Why Trust TimeCraft' = 'Why Trust ChronoLux'
  'About TimeCraft Repairs' = 'About ChronoLux'
  'Edmund Hartley' = 'Alexander Hartley'
  'Edmund founded' = 'Alexander founded'
  'When we replace a battery at TimeCraft,' = 'When we replace a battery at ChronoLux,'
  'Hello%20TimeCraft%20Repairs' = 'Hello%20ChronoLux'
  'Clerkenwell' = 'Mayfair'
  "London's trusted destination for watch and jewellery repair since 1992. Precision, integrity, and care in every repair." = "Mayfair's premier atelier for luxury watch and fine jewellery restoration since 1992. White-glove service, master craftsmanship, and uncompromising standards."
  'Book Appointment' = 'Book Consultation'
  'Book a Drop-Off' = 'Book a Consultation'
  'Schedule Your Visit' = 'Reserve Your Consultation'
  'Book an Appointment' = 'Book a Consultation'
  'fas fa-clock clock-icon' = 'fas fa-gem clock-icon'
}

Write-Host "`n=== Updating HTML pages ==="
Get-ChildItem $PagesDir -Filter *.html | ForEach-Object {
  $content = [System.IO.File]::ReadAllText($_.FullName)
  foreach ($pair in $Replacements.GetEnumerator()) {
    $content = $content.Replace($pair.Key, $pair.Value)
  }
  [System.IO.File]::WriteAllText($_.FullName, $content)
  Write-Host "Updated: $($_.Name)"
}

Write-Host "`nDone."

from django.db import models

class CostFromTo(models.Model):
    cost_from = models.IntegerField()
    cost_to = models.IntegerField()

class Items(models.Model):
    tier_choices = [
        ("Minor", "Minor"),
        ("Major", "Major"),
    ]

    rarity_choices = [
        ("Common", "Common"),
        ("Uncommon", "Uncommon"),
        ("Rare", "Rare"),
        ("Epic", "Epic"),
        ("Legendary", "Legendary"),
        ("Artifact", "Artifact"),
        ("Varies", "Varies"),
    ]

    spellcaster_focus_choices = [
        ("Artificer", "Artificer"),
        ("Cleric", "Cleric"),
        ("Druid", "Druid"),
        ("Sorcerer", "Sorcerer"),
        ("Wizard", "Wizard"),
        ("Bard", "Bard"),
        ("Paladin", "Paladin"),
        ("Ranger", "Ranger"),
        ("Warlock", "Warlock"),
    ]

    weapon_damage_type_choices = [
        ("Bludgeoning", "Bludgeoning"),
        ("Cold", "Cold"),
        ("Fire", "Fire"),
        ("Necrotic", "Necrotic"),
        ("Force", "Force"),
        ("Piercing", "Piercing"),
        ("Radiant", "Radiant"),
        ("Slashing", "Slashing"),
    ]

    weapon_damage_dice_choices = [
        ("1", "1"),
        ("1d4", "1d4"),
        ("1d6", "1d6"),
        ("1d8", "1d8"),
        ("2d4", "2d4"),
        ("1d10", "1d10"),
        ("1d12", "1d12"),
        ("2d6", "2d6"),
        ("2d8", "2d8"),
        ("3d6", "3d6"),
        ("2d10", "2d10"),
        ("3d8", "3d8"),
        ("6d6", "6d6"),
        ("3d12", "3d12"),
        ("6d8", "6d8"),
    ]

    bonus_choices = [
        ("Armor Class", "Armor Class"),
        ("Proficiency Bonus", "Proficiency Bonus"),
        ("Spell Attacks", "Spell Attacks"),
        ("Spell Save DC", "Spell Save DC"),
        ("Saving Throws", "Saving Throws"),
        ("Weapon Attack and Damage Rolls", "Weapon Attack and Damage Rolls"),
        ("Weapon Attack and Damage Rolls (+1)", "Weapon Attack and Damage Rolls (+1)"),
        ("Weapon Attack and Damage Rolls (+2)", "Weapon Attack and Damage Rolls (+2)"),
        ("Weapon Attack and Damage Rolls (+3)", "Weapon Attack and Damage Rolls (+3)"),
        ("Weapon Attack Rolls", "Weapon Attack Rolls"),
        ("Weapon Attack Rolls (+1)", "Weapon Attack Rolls (+1)"),
        ("Weapon Attack Rolls (+2)", "Weapon Attack Rolls (+2)"),
        ("Weapon Attack Rolls (+3)", "Weapon Attack Rolls (+3)"),
        ("Weapon Damage Rolls", "Weapon Damage Rolls"),
        ("Weapon Damage Rolls (+1)", "Weapon Damage Rolls (+1)"),
        ("Weapon Damage Rolls (+2)", "Weapon Damage Rolls (+2)"),
        ("Weapon Damage Rolls (+3)", "Weapon Damage Rolls (+3)"),
    ]

    miscellaneous_choices = [
        ("Ability Score Adjustment", "Ability Score Adjustment"),
        ("Basic Rules Bundle", "Basic Rules Bundle"),
        ("Charges", "Charges"),
        ("Creates Food/Water", "Creates Food/Water"),
        ("Cursed", "Cursed"),
        ("Disadvantage on Stealth", "Disadvantage on Stealth"),
        ("Expanded Critical Range", "Expanded Critical Range"),
        ("Grants Language", "Grants Language"),
        ("Grants Proficiency", "Grants Proficiency"),
        ("Has Images", "Has Images"),
        ("Has Info", "Has Info"),
        ("Item Group", "Item Group"),
        ("Legacy", "Legacy"),
        ("Magic", "Magic"),
        ("Mundane", "Mundane"),
        ("Reprinted", "Reprinted"),
        ("SRD", "SRD"),
        ("Sentient", "Sentient"),
        ("Speed Adjustment", "Speed Adjustment"),
        ("Strength Requirement", "Strength Requirement"),
        ("Trinket Table", "Trinket Table"),
    ]

    recharge_type_choices = [
        ("Dawn", "Dawn"),
        ("Decade", "Decade"),
        ("Dusk", "Dusk"),
        ("Midnight", "Midnight"),
        ("Long Rest", "Long Rest"),
        ("Short Rest", "Short Rest"),
        ("Special", "Special"),
    ]

    base_item_choices = [
        ("Antimatter Rifle (DMG)", "Antimatter Rifle (DMG)"),
        ("Arrow", "Arrow"),
        ("Automatic Pistol (DMG)", "Automatic Pistol (DMG)"),
        ("Automatic Rifle (DMG)", "Automatic Rifle (DMG)"),
        ("Battleaxe", "Battleaxe"),
        ("Blowgun Needle", "Blowgun Needle"),
        ("Blowgun", "Blowgun"),
        ("Breastplate", "Breastplate"),
        ("Chain Mail", "Chain Mail"),
        ("Chain Shirt", "Chain Shirt"),
        ("Club", "Club"),
        ("Crossbow Bolt", "Crossbow Bolt"),
        ("Crystal", "Crystal"),
        ("Dagger", "Dagger"),
        ("Dart", "Dart"),
        ("Double-Bladed Scimitar (ERLW)", "Double-Bladed Scimitar (ERLW)"),
        ("Energy Cell (DMG)", "Energy Cell (DMG)"),
        ("Flail", "Flail"),
        ("Glaive", "Glaive"),
        ("Greataxe", "Greataxe"),
        ("Greatclub", "Greatclub"),
        ("Greatsword", "Greatsword"),
        ("Halberd", "Halberd"),
        ("Half Plate Armor", "Half Plate Armor"),
        ("Hand Crossbow", "Hand Crossbow"),
        ("Handaxe", "Handaxe"),
        ("Heavy Crossbow", "Heavy Crossbow"),
        ("Hide Armor", "Hide Armor"),
        ("Hooked Shortspear (OotA)", "Hooked Shortspear (OotA)"),
        ("Hoopak (DSotDQ)", "Hoopak (DSotDQ)"),
        ("Hunting Rifle (DMG)", "Hunting Rifle (DMG)"),
        ("Javelin", "Javelin"),
        ("Lance", "Lance"),
        ("Laser Pistol (DMG)", "Laser Pistol (DMG)"),
        ("Laser Rifle (DMG)", "Laser Rifle (DMG)"),
        ("Leather Armor", "Leather Armor"),
        ("Light Crossbow", "Light Crossbow"),
        ("Light Hammer", "Light Hammer"),
        ("Light Repeating Crossbow (OotA)", "Light Repeating Crossbow (OotA)"),
        ("Longbow", "Longbow"),
        ("Longsword", "Longsword"),
        ("Mace", "Mace"),
        ("Maul", "Maul"),
        ("Modern Bullet (DMG)", "Modern Bullet (DMG)"),
        ("Morningstar", "Morningstar"),
        ("Musket (DMG)", "Musket (DMG)"),
        ("Net", "Net"),
        ("Orb", "Orb"),
        ("Padded Armor", "Padded Armor"),
        ("Pike", "Pike"),
        ("Pistol (DMG)", "Pistol (DMG)"),
        ("Plate Armor", "Plate Armor"),
        ("Quarterstaff", "Quarterstaff"),
        ("Rapier", "Rapier"),
        ("Renaissance Bullet (DMG)", "Renaissance Bullet (DMG)"),
        ("Revolver (DMG)", "Revolver (DMG)"),
        ("Ring Mail", "Ring Mail"),
        ("Rod", "Rod"),
        ("Scale Mail", "Scale Mail"),
        ("Scimitar", "Scimitar"),
        ("Shield", "Shield"),
        ("Shortbow", "Shortbow"),
        ("Shortsword", "Shortsword"),
        ("Shotgun (DMG)", "Shotgun (DMG)"),
        ("Sickle", "Sickle"),
        ("Sling Bullet", "Sling Bullet"),
        ("Sling", "Sling"),
        ("Spear", "Spear"),
        ("Spiked Armor (SCAG)", "Spiked Armor (SCAG)"),
        ("Splint Armor", "Splint Armor"),
        ("Staff", "Staff"),
        ("Studded Leather Armor", "Studded Leather Armor"),
        ("Trident", "Trident"),
        ("Wand", "Wand"),
        ("War Pick", "War Pick"),
        ("Warhammer", "Warhammer"),
        ("Whip", "Whip"),
        ("Wooden Staff", "Wooden Staff"),
        ("Yklwa (ToA)", "Yklwa (ToA)"),
    ]

    source_choices = [
        ("Acquisitions Incorporated", "Acquisitions Incorporated"),
        ("Astral Adventurer’s Guide", "Astral Adventurer’s Guide"),
        ("Baldur’s Gate: Descent Into Avernus", "Baldur’s Gate: Descent Into Avernus"),
        ("Bigby Presents: Glory of the Giants", "Bigby Presents: Glory of the Giants"),
        ("Boo’s Astral Menagerie", "Boo’s Astral Menagerie"),
        ("Candlekeep Mysteries", "Candlekeep Mysteries"),
        ("Curse of Strahd", "Curse of Strahd"),
        ("Descent into the Lost Caverns of Tsojcanth", "Descent into the Lost Caverns of Tsojcanth"),
        ("Divine Contention", "Divine Contention"),
        ("Dragonlance: Shadow of the Dragon Queen", "Dragonlance: Shadow of the Dragon Queen"),
        ("Dungeon Master’s Guide", "Dungeon Master’s Guide"),
        ("Eberron: Rising from the Last War", "Eberron: Rising from the Last War"),
        ("Elemental Evil: Trinkets", "Elemental Evil: Trinkets"),
        ("Fizban’s Treasury of Dragons", "Fizban’s Treasury of Dragons"),
        ("Ghosts of Saltmarsh", "Ghosts of Saltmarsh"),
        ("Guildmasters’ Guide to Ravnica", "Guildmasters’ Guide to Ravnica"),
        ("Hoard of the Dragon Queen", "Hoard of the Dragon Queen"),
        ("Icewind Dale: Rime of the Frostmaiden", "Icewind Dale: Rime of the Frostmaiden"),
        ("Journeys through the Radiant Citadel", "Journeys through the Radiant Citadel"),
        ("Keys from the Golden Vault", "Keys from the Golden Vault"),
        ("Light of Xaryxis", "Light of Xaryxis"),
        ("Lost Mine of Phandelver", "Lost Mine of Phandelver"),
        ("Monster Manual", "Monster Manual"),
        ("Mordenkainen Presents: Monsters of the Multiverse", "Mordenkainen Presents: Monsters of the Multiverse"),
        ("Mordenkainen’s Tome of Foes", "Mordenkainen’s Tome of Foes"),
        ("Mythic Odysseys of Theros", "Mythic Odysseys of Theros"),
        ("Out of the Abyss", "Out of the Abyss"),
        ("Phandelver and Below: The Shattered Obelisk", "Phandelver and Below: The Shattered Obelisk"),
        ("Player’s Handbook", "Player’s Handbook"),
        ("Princes of the Apocalypse", "Princes of the Apocalypse"),
        ("Sigil and the Outlands", "Sigil and the Outlands"),
        ("Sleeping Dragon’s Wake", "Sleeping Dragon’s Wake"),
        ("Storm King’s Thunder", "Storm King’s Thunder"),
        ("Strixhaven: A Curriculum of Chaos", "Strixhaven: A Curriculum of Chaos"),
        ("Sword Coast Adventurer’s Guide", "Sword Coast Adventurer’s Guide"),
        ("Tales from the Yawning Portal", "Tales from the Yawning Portal"),
        ("Tasha’s Cauldron of Everything", "Tasha’s Cauldron of Everything"),
        ("The Book of Many Things", "The Book of Many Things"),
        ("The Rise of Tiamat", "The Rise of Tiamat"),
        ("The Rise of Tiamat Online Supplement", "The Rise of Tiamat Online Supplement"),
        ("The Wild Beyond the Witchlight", "The Wild Beyond the Witchlight"),
        ("Tomb of Annihilation", "Tomb of Annihilation"),
        ("Tyranny of Dragons", "Tyranny of Dragons"),
        ("Van Richten’s Guide to Ravenloft", "Van Richten’s Guide to Ravenloft"),
        ("Vecna: Eve of Ruin", "Vecna: Eve of Ruin"),
        ("Volo’s Guide to Monsters", "Volo’s Guide to Monsters"),
        ("Waterdeep: Dragon Heist", "Waterdeep: Dragon Heist"),
        ("Waterdeep: Dungeon of the Mad Mage", "Waterdeep: Dungeon of the Mad Mage"),
        ("Xanathar’s Guide to Everything", "Xanathar’s Guide to Everything"),
    ]

    type = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    tier = models.CharField(max_length=100, choices=tier_choices, default=None)
    rarity = models.CharField(max_length=100, choices=rarity_choices, default=None)
    property = models.CharField(max_length=100)
    attunement = models.CharField(max_length=100)
    text = models.TextField(null=True, blank=True)
    spellcaster_focus = models.CharField(max_length=100, choices=spellcaster_focus_choices, default=None)
    weapon_damage_type = models.CharField(max_length=100, choices=weapon_damage_type_choices, default=None)
    weapon_damage_dice = models.CharField(max_length=100, choices=weapon_damage_dice_choices, default=None)
    bonus = models.CharField(max_length=100, choices=bonus_choices, default=None)
    miscellaneous = models.CharField(max_length=100, choices=miscellaneous_choices, default=None)
    recharge_type = models.CharField(max_length=100, choices=recharge_type_choices, default=None)
    base_item = models.CharField(max_length=100, choices=base_item_choices, default=None)
    source = models.CharField(max_length=100, choices=source_choices, default="Rebreya: Shadow of Progress")

    weight = models.IntegerField()
    cost = models.OneToOneField(CostFromTo, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class Race(models.Model):
    text = models.TextField(null=True, blank=True)
    damage_vulnerability_choices = [
        ("Acid", "Acid"),
        ("Bludgeoning", "Bludgeoning"),
        ("Cold", "Cold"),
        ("Fire", "Fire"),
        ("Force", "Force"),
        ("Lightning", "Lightning"),
        ("Necrotic", "Necrotic"),
        ("Piercing", "Piercing"),
        ("Poison", "Poison"),
        ("Psychic", "Psychic"),
        ("Radiant", "Radiant"),
        ("Slashing", "Slashing"),
        ("Thunder", "Thunder"),
    ]

    damage_resistance_choices = damage_vulnerability_choices
    damage_immunity_choices = damage_vulnerability_choices

    condition_immunity_choices = [
        ("Blinded", "Blinded"),
        ("Charmed", "Charmed"),
        ("Deafened", "Deafened"),
        ("Disease", "Disease"),
        ("Exhaustion", "Exhaustion"),
        ("Frightened", "Frightened"),
        ("Grappled", "Grappled"),
        ("Incapacitated", "Incapacitated"),
        ("Invisible", "Invisible"),
        ("Paralyzed", "Paralyzed"),
        ("Petrified", "Petrified"),
        ("Poisoned", "Poisoned"),
        ("Prone", "Prone"),
        ("Restrained", "Restrained"),
        ("Stunned", "Stunned"),
        ("Unconscious", "Unconscious"),
    ]

    language_choices = [
        ("Abyssal", "Abyssal"),
        ("Aquan", "Aquan"),
        ("Auran", "Auran"),
        ("Celestial", "Celestial"),
        ("Choose", "Choose"),
        ("Common", "Common"),
        ("Draconic", "Draconic"),
        ("Dwarvish", "Dwarvish"),
        ("Elvish", "Elvish"),
        ("Giant", "Giant"),
        ("Gnomish", "Gnomish"),
        ("Goblin", "Goblin"),
        ("Halfling", "Halfling"),
        ("Infernal", "Infernal"),
        ("Orc", "Orc"),
        ("Other", "Other"),
        ("Primordial", "Primordial"),
        ("Sylvan", "Sylvan"),
        ("Terran", "Terran"),
        ("Undercommon", "Undercommon"),
    ]

    base_race_choices = [
        ("Aasimar", "Aasimar"),
        ("Aven", "Aven"),
        ("Cervan", "Cervan"),
        ("Corvum", "Corvum"),
        ("Dragonborn", "Dragonborn"),
        ("Dwarf", "Dwarf"),
        ("Elf", "Elf"),
        ("Elf (Kaladesh)", "Elf (Kaladesh)"),
        ("Elf (Zendikar)", "Elf (Zendikar)"),
        ("Gallus", "Gallus"),
        ("Genasi", "Genasi"),
        ("Gith", "Gith"),
        ("Gnome", "Gnome"),
        ("Goblin", "Goblin"),
        ("Half-Elf", "Half-Elf"),
        ("Half-Orc", "Half-Orc"),
        ("Halfling", "Halfling"),
        ("Human", "Human"),
        ("Human (Innistrad)", "Human (Innistrad)"),
        ("Luma", "Luma"),
        ("Merfolk", "Merfolk"),
        ("Raptor", "Raptor"),
        ("Shifter", "Shifter"),
        ("Strig", "Strig"),
        ("Tiefling", "Tiefling"),
        ("Vampire", "Vampire"),
    ]

    creature_type_choices = [
        ("Aberration", "Aberration"),
        ("Beast", "Beast"),
        ("Celestial", "Celestial"),
        ("Construct", "Construct"),
        ("Dragon", "Dragon"),
        ("Elemental", "Elemental"),
        ("Fey", "Fey"),
        ("Fiend", "Fiend"),
        ("Giant", "Giant"),
        ("Humanoid", "Humanoid"),
        ("Monstrosity", "Monstrosity"),
        ("Ooze", "Ooze"),
        ("Plant", "Plant"),
        ("Undead", "Undead"),
    ]

    miscellaneous_choices = [
        ("Base Race", "Base Race"),
        ("Basic Rules", "Basic Rules"),
        ("Has Images", "Has Images"),
        ("Has Info", "Has Info"),
        ("Key Race", "Key Race"),
        ("Legacy", "Legacy"),
        ("Lineage", "Lineage"),
        ("Modified Copy", "Modified Copy"),
        ("Reprinted", "Reprinted"),
        ("SRD", "SRD"),
    ]

    size_choices = [
        ("Small", "Small"),
        ("Medium", "Medium"),
        ("Varies", "Varies"),
    ]

    speed_choices = [
        ("Climb", "Climb"),
        ("Fly", "Fly"),
        ("Swim", "Swim"),
        ("Walk", "Walk"),
        ("Walk (Fast)", "Walk (Fast)"),
        ("Walk (Slow)", "Walk (Slow)"),
    ]

    traits_choices = [
        ("Amphibious", "Amphibious"),
        ("Armor Proficiency", "Armor Proficiency"),
        ("Blindsight", "Blindsight"),
        ("Darkvision", "Darkvision"),
        ("Dragonmark", "Dragonmark"),
        ("Feat", "Feat"),
        ("Improved Resting", "Improved Resting"),
        ("Language Proficiency", "Language Proficiency"),
        ("Magic Resistance", "Magic Resistance"),
        ("Monstrous Race", "Monstrous Race"),
        ("NPC Race", "NPC Race"),
        ("Natural Armor", "Natural Armor"),
        ("Natural Weapon", "Natural Weapon"),
        ("Powerful Build", "Powerful Build"),
        ("Skill Bonus Dice", "Skill Bonus Dice"),
        ("Skill Proficiency", "Skill Proficiency"),
        ("Spellcasting", "Spellcasting"),
        ("Sunlight Sensitivity", "Sunlight Sensitivity"),
        ("Superior Darkvision", "Superior Darkvision"),
        ("Tool Bonus Dice", "Tool Bonus Dice"),
        ("Tool Proficiency", "Tool Proficiency"),
        ("Uncommon Race", "Uncommon Race"),
        ("Weapon Proficiency", "Weapon Proficiency"),
    ]

    source_choices = [
        ("Acquisitions Incorporated", "Acquisitions Incorporated"),
        ("Astral Adventurer’s Guide", "Astral Adventurer’s Guide"),
        ("Dragonlance: Shadow of the Dragon Queen", "Dragonlance: Shadow of the Dragon Queen"),
        ("Dungeon Master’s Guide", "Dungeon Master’s Guide"),
        ("Eberron: Rising from the Last War", "Eberron: Rising from the Last War"),
        ("Elemental Evil Player’s Companion", "Elemental Evil Player’s Companion"),
        ("Fizban’s Treasury of Dragons", "Fizban’s Treasury of Dragons"),
        ("Guildmasters’ Guide to Ravnica", "Guildmasters’ Guide to Ravnica"),
        ("Icewind Dale: Rime of the Frostmaiden", "Icewind Dale: Rime of the Frostmaiden"),
        ("Mordenkainen Presents: Monsters of the Multiverse", "Mordenkainen Presents: Monsters of the Multiverse"),
        ("Mordenkainen’s Tome of Foes", "Mordenkainen’s Tome of Foes"),
        ("Mythic Odysseys of Theros", "Mythic Odysseys of Theros"),
        ("Player’s Handbook", "Player’s Handbook"),
        ("Strixhaven: A Curriculum of Chaos", "Strixhaven: A Curriculum of Chaos"),
        ("Sword Coast Adventurer’s Guide", "Sword Coast Adventurer’s Guide"),
        ("Tasha’s Cauldron of Everything", "Tasha’s Cauldron of Everything"),
        ("The Wild Beyond the Witchlight", "The Wild Beyond the Witchlight"),
        ("Van Richten’s Guide to Ravenloft", "Van Richten’s Guide to Ravenloft"),
        ("Volo’s Guide to Monsters", "Volo’s Guide to Monsters"),
    ]

    name = models.CharField(max_length=100)
    damage_vulnerability = models.CharField(max_length=100, choices=damage_vulnerability_choices, default=None)
    damage_resistance = models.CharField(max_length=100, choices=damage_resistance_choices, default=None)
    damage_immunity = models.CharField(max_length=100, choices=damage_immunity_choices, default=None)
    condition_immunity = models.CharField(max_length=100, choices=condition_immunity_choices, default=None)
    language = models.CharField(max_length=100, choices=language_choices, default=None)
    base_race = models.CharField(max_length=100, choices=base_race_choices, default=None)
    creature_type = models.CharField(max_length=100, choices=creature_type_choices, default=None)
    miscellaneous = models.CharField(max_length=100, choices=miscellaneous_choices, default=None)
    size = models.CharField(max_length=100, choices=size_choices, default=None)
    speed = models.CharField(max_length=100, choices=speed_choices, default=None)
    traits = models.CharField(max_length=100, choices=traits_choices, default=None)
    source = models.CharField(max_length=100, choices=source_choices, default="Rebreya: Shadow of Progress")
    adult_age = models.IntegerField()
    strength = models.IntegerField()
    dexterity = models.IntegerField()
    constitution = models.IntegerField()
    intelligence = models.IntegerField()
    wisdom = models.IntegerField()
    charisma = models.IntegerField()

    def __str__(self):
        return self.name

class Subrace(models.Model):
    # Ссылка на базовую расу
    base_race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='subraces')

    # Название подрасы
    name = models.CharField(max_length=100)

    # Описание подрасы
    text = models.TextField(null=True, blank=True)

    # Модификаторы характеристик (если они отличаются от базовой расы)
    strength_modifier = models.IntegerField(default=0)
    dexterity_modifier = models.IntegerField(default=0)
    constitution_modifier = models.IntegerField(default=0)
    intelligence_modifier = models.IntegerField(default=0)
    wisdom_modifier = models.IntegerField(default=0)
    charisma_modifier = models.IntegerField(default=0)

    # Уникальные особенности подрасы
    special_traits = models.JSONField(default=dict)  # Это поле может включать уникальные черты подрасы

    # Владение языками (если отличается от базовой расы)
    language_choices = [
        ("Abyssal", "Abyssal"),
        ("Aquan", "Aquan"),
        ("Auran", "Auran"),
        ("Celestial", "Celestial"),
        ("Choose", "Choose"),
        ("Common", "Common"),
        ("Draconic", "Draconic"),
        ("Dwarvish", "Dwarvish"),
        ("Elvish", "Elvish"),
        ("Giant", "Giant"),
        ("Gnomish", "Gnomish"),
        ("Goblin", "Goblin"),
        ("Halfling", "Halfling"),
        ("Infernal", "Infernal"),
        ("Orc", "Orc"),
        ("Other", "Other"),
        ("Primordial", "Primordial"),
        ("Sylvan", "Sylvan"),
        ("Terran", "Terran"),
        ("Undercommon", "Undercommon"),
    ]
    additional_languages = models.CharField(max_length=100, choices=language_choices, null=True, blank=True)

    # Уникальные черты, такие как темповая скорость, тип защиты и т.п.
    unique_traits = models.JSONField(default=dict, null=True, blank=True)

    # Источник
    source_choices = [
        ("Acquisitions Incorporated", "Acquisitions Incorporated"),
        ("Astral Adventurer’s Guide", "Astral Adventurer’s Guide"),
        ("Dragonlance: Shadow of the Dragon Queen", "Dragonlance: Shadow of the Dragon Queen"),
        ("Dungeon Master’s Guide", "Dungeon Master’s Guide"),
        ("Eberron: Rising from the Last War", "Eberron: Rising from the Last War"),
        ("Elemental Evil Player’s Companion", "Elemental Evil Player’s Companion"),
        ("Fizban’s Treasury of Dragons", "Fizban’s Treasury of Dragons"),
        ("Guildmasters’ Guide to Ravnica", "Guildmasters’ Guide to Ravnica"),
        ("Icewind Dale: Rime of the Frostmaiden", "Icewind Dale: Rime of the Frostmaiden"),
        ("Mordenkainen Presents: Monsters of the Multiverse", "Mordenkainen Presents: Monsters of the Multiverse"),
        ("Mordenkainen’s Tome of Foes", "Mordenkainen’s Tome of Foes"),
        ("Mythic Odysseys of Theros", "Mythic Odysseys of Theros"),
        ("Player’s Handbook", "Player’s Handbook"),
        ("Strixhaven: A Curriculum of Chaos", "Strixhaven: A Curriculum of Chaos"),
        ("Sword Coast Adventurer’s Guide", "Sword Coast Adventurer’s Guide"),
        ("Tasha’s Cauldron of Everything", "Tasha’s Cauldron of Everything"),
        ("The Wild Beyond the Witchlight", "The Wild Beyond the Witchlight"),
        ("Van Richten’s Guide to Ravenloft", "Van Richten’s Guide to Ravenloft"),
        ("Volo’s Guide to Monsters", "Volo’s Guide to Monsters"),
    ]
    source = models.CharField(max_length=100, choices=source_choices, default="Rebreya: Shadow of Progress")

    def __str__(self):
        return f"{self.name} ({self.base_race.name})"

class Feats(models.Model):
    ability_bonus_choices = [
        ("Strength", "Strength"),
        ("Dexterity", "Dexterity"),
        ("Constitution", "Constitution"),
        ("Intelligence", "Intelligence"),
        ("Wisdom", "Wisdom"),
        ("Charisma", "Charisma"),
    ]

    prerequisite_choices = [
        ("Ability", "Ability"),
        ("Proficiency", "Proficiency"),
        ("Psionics", "Psionics"),
        ("Race", "Race"),
        ("Special", "Special"),
        ("Spellcasting", "Spellcasting"),
    ]

    level_choices = [
        ("Level 1", "Level 1"),
        ("Level 4", "Level 4"),
        ("Level 11", "Level 11"),
    ]

    benefits_choices = [
        ("Armor Proficiency", "Armor Proficiency"),
        ("Damage Resistance", "Damage Resistance"),
        ("Language Proficiency", "Language Proficiency"),
        ("Skill Proficiency", "Skill Proficiency"),
        ("Spellcasting", "Spellcasting"),
        ("Tool Proficiency", "Tool Proficiency"),
        ("Weapon Proficiency", "Weapon Proficiency"),
    ]

    damage_vulnerability_choices = [
        ("Acid", "Acid"),
        ("Bludgeoning", "Bludgeoning"),
        ("Cold", "Cold"),
        ("Fire", "Fire"),
        ("Force", "Force"),
        ("Lightning", "Lightning"),
        ("Necrotic", "Necrotic"),
        ("Piercing", "Piercing"),
        ("Poison", "Poison"),
        ("Psychic", "Psychic"),
        ("Radiant", "Radiant"),
        ("Slashing", "Slashing"),
        ("Thunder", "Thunder"),
    ]

    damage_resistance_choices = damage_vulnerability_choices
    damage_immunity_choices = damage_vulnerability_choices

    condition_immunity_choices = [
        ("Blinded", "Blinded"),
        ("Charmed", "Charmed"),
        ("Deafened", "Deafened"),
        ("Disease", "Disease"),
        ("Exhaustion", "Exhaustion"),
        ("Frightened", "Frightened"),
        ("Grappled", "Grappled"),
        ("Incapacitated", "Incapacitated"),
        ("Invisible", "Invisible"),
        ("Paralyzed", "Paralyzed"),
        ("Petrified", "Petrified"),
        ("Poisoned", "Poisoned"),
        ("Prone", "Prone"),
        ("Restrained", "Restrained"),
        ("Stunned", "Stunned"),
        ("Unconscious", "Unconscious"),
    ]

    miscellaneous_choices = [
        ("Basic Rules", "Basic Rules"),
        ("Has Images", "Has Images"),
        ("Has Info", "Has Info"),
        ("Legacy", "Legacy"),
        ("SRD", "SRD"),
    ]

    source_choices = [
        ("Bigby Presents: Glory of the Giants", "Bigby Presents: Glory of the Giants"),
        ("Dragonlance: Shadow of the Dragon Queen", "Dragonlance: Shadow of the Dragon Queen"),
        ("Eberron: Rising from the Last War", "Eberron: Rising from the Last War"),
        ("Fizban’s Treasury of Dragons", "Fizban’s Treasury of Dragons"),
        ("Mordenkainen’s Tome of Foes", "Mordenkainen’s Tome of Foes"),
        ("Player’s Handbook", "Player’s Handbook"),
        ("Sigil and the Outlands", "Sigil and the Outlands"),
        ("Strixhaven: A Curriculum of Chaos", "Strixhaven: A Curriculum of Chaos"),
        ("Tasha’s Cauldron of Everything", "Tasha’s Cauldron of Everything"),
        ("The Book of Many Things", "The Book of Many Things"),
        ("Xanathar’s Guide to Everything", "Xanathar’s Guide to Everything"),
    ]

    name = models.CharField(max_length=100)
    ability_bonus = models.CharField(max_length=100, choices=ability_bonus_choices, default=None)

    # Ссылка на модель Race для расы в требованиях
    prerequisite_race = models.ForeignKey('Race', on_delete=models.CASCADE, null=True, blank=True)

    # Ссылка на модель Class для класса в требованиях
    prerequisite_class = models.ForeignKey('Classes', on_delete=models.CASCADE, null=True, blank=True)

    # Остальные требования остаются как ранее
    prerequisite = models.CharField(max_length=100, choices=prerequisite_choices, default=None)
    level = models.CharField(max_length=100, choices=level_choices, default=None)
    benefits = models.CharField(max_length=100, choices=benefits_choices, default=None)
    damage_vulnerability = models.CharField(max_length=100, choices=damage_vulnerability_choices, default=None)
    damage_resistance = models.CharField(max_length=100, choices=damage_resistance_choices, default=None)
    damage_immunity = models.CharField(max_length=100, choices=damage_immunity_choices, default=None)
    condition_immunity = models.CharField(max_length=100, choices=condition_immunity_choices, default=None)
    miscellaneous = models.CharField(max_length=100, choices=miscellaneous_choices, default=None)
    text = models.TextField(null=True, blank=True)
    source = models.CharField(max_length=100, choices=source_choices, default="Rebreya: Shadow of Progress")

    def __str__(self):
        return self.name

class Spells(models.Model):
    name = models.CharField(max_length=100)

    # Уровень заклинания
    level_choices = [
        ("Cantrip", "Cantrip"),
        ("1st level", "1st level"),
        ("2nd level", "2nd level"),
        ("3rd level", "3rd level"),
        ("4th level", "4th level"),
        ("5th level", "5th level"),
        ("6th level", "6th level"),
        ("7th level", "7th level"),
        ("8th level", "8th level"),
        ("9th level", "9th level"),
    ]
    level = models.CharField(max_length=20, choices=level_choices, default="Cantrip")

    # Ссылка на модель Класса
    spell_class = models.ForeignKey('Classes', on_delete=models.CASCADE, related_name='spells_in_class')

    # Ссылка на модель Подкласса
    subclass = models.ForeignKey('Subclass', on_delete=models.CASCADE, null=True, blank=True)

    # Ссылка на модель Расы
    race = models.ForeignKey('Race', on_delete=models.CASCADE, null=True, blank=True)

    # Ссылка на модель Подрасы
    subrace = models.ForeignKey('Subrace', on_delete=models.CASCADE, null=True, blank=True)

    # Остальные поля из предыдущей версии остаются без изменений
    background = models.CharField(max_length=100, null=True, blank=True)
    feat = models.CharField(max_length=100, null=True, blank=True)
    components = models.CharField(max_length=500, null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    school = models.CharField(max_length=50, choices=[
        ("Abjuration", "Abjuration"),
        ("Conjuration", "Conjuration"),
        ("Divination", "Divination"),
        ("Enchantment", "Enchantment"),
        ("Evocation", "Evocation"),
        ("Illusion", "Illusion"),
        ("Necromancy", "Necromancy"),
        ("Psionic", "Psionic"),
        ("Transmutation", "Transmutation"),
    ], default=None)
    damage_type = models.CharField(max_length=50, choices=[
        ("Acid", "Acid"),
        ("Bludgeoning", "Bludgeoning"),
        ("Cold", "Cold"),
        ("Fire", "Fire"),
        ("Force", "Force"),
        ("Lightning", "Lightning"),
        ("Necrotic", "Necrotic"),
        ("Piercing", "Piercing"),
        ("Poison", "Poison"),
        ("Psychic", "Psychic"),
        ("Radiant", "Radiant"),
        ("Slashing", "Slashing"),
        ("Thunder", "Thunder"),
    ], default=None, null=True, blank=True)
    condition_inflicted = models.CharField(max_length=50, choices=[
        ("Blinded", "Blinded"),
        ("Charmed", "Charmed"),
        ("Deafened", "Deafened"),
        ("Exhaustion", "Exhaustion"),
        ("Frightened", "Frightened"),
        ("Grappled", "Grappled"),
        ("Incapacitated", "Incapacitated"),
        ("Invisible", "Invisible"),
        ("Paralyzed", "Paralyzed"),
        ("Petrified", "Petrified"),
        ("Poisoned", "Poisoned"),
        ("Prone", "Prone"),
        ("Restrained", "Restrained"),
        ("Stunned", "Stunned"),
        ("Unconscious", "Unconscious"),
    ], default=None, null=True, blank=True)
    spell_attack = models.CharField(max_length=50, choices=[
        ("Melee", "Melee"),
        ("Ranged", "Ranged"),
        ("Other/Unknown", "Other/Unknown"),
    ], default=None, null=True, blank=True)
    saving_throw = models.CharField(max_length=50, choices=[
        ("Strength Save", "Strength Save"),
        ("Dexterity Save", "Dexterity Save"),
        ("Constitution Save", "Constitution Save"),
        ("Intelligence Save", "Intelligence Save"),
        ("Wisdom Save", "Wisdom Save"),
        ("Charisma Save", "Charisma Save"),
    ], default=None, null=True, blank=True)
    ability_check = models.CharField(max_length=50, choices=[
        ("Strength Check", "Strength Check"),
        ("Dexterity Check", "Dexterity Check"),
        ("Constitution Check", "Constitution Check"),
        ("Intelligence Check", "Intelligence Check"),
        ("Wisdom Check", "Wisdom Check"),
        ("Charisma Check", "Charisma Check"),
    ], default=None, null=True, blank=True)
    cast_time = models.CharField(max_length=50, choices=[
        ("Action", "Action"),
        ("Bonus Action", "Bonus Action"),
        ("Reaction", "Reaction"),
        ("Rounds", "Rounds"),
        ("Minutes", "Minutes"),
        ("Hours", "Hours"),
        ("Special", "Special"),
    ], default=None)
    duration = models.CharField(max_length=50, choices=[
        ("Instant", "Instant"),
        ("Rounds", "Rounds"),
        ("Minutes", "Minutes"),
        ("Hours", "Hours"),
        ("Special", "Special"),
    ], default="Instant")
    range = models.CharField(max_length=50)
    area_style = models.CharField(max_length=50, choices=[
        ("Single Target", "Single Target"),
        ("Multiple Targets", "Multiple Targets"),
        ("Circle", "Circle"),
        ("Cone", "Cone"),
        ("Cube", "Cube"),
        ("Cylinder", "Cylinder"),
        ("Hemisphere", "Hemisphere"),
        ("Line", "Line"),
        ("Sphere", "Sphere"),
        ("Square", "Square"),
        ("Wall", "Wall"),
    ], default=None, null=True, blank=True)
    affects_creature_types = models.CharField(max_length=50, choices=[
        ("Aberration", "Aberration"),
        ("Beast", "Beast"),
        ("Celestial", "Celestial"),
        ("Construct", "Construct"),
        ("Dragon", "Dragon"),
        ("Elemental", "Elemental"),
        ("Fey", "Fey"),
        ("Fiend", "Fiend"),
        ("Giant", "Giant"),
        ("Humanoid", "Humanoid"),
        ("Monstrosity", "Monstrosity"),
        ("Ooze", "Ooze"),
        ("Plant", "Plant"),
        ("Undead", "Undead"),
    ], default=None, null=True, blank=True)

    def __str__(self):
        return self.name

class Backgrounds(models.Model):
    # Название предыстории
    name = models.CharField(max_length=100)
    text = models.TextField(null=True, blank=True)
    # Ссылка на модель Race для расы в предыстории
    race = models.ForeignKey('Race', on_delete=models.CASCADE, null=True, blank=True)

    # Ссылка на модель Class для класса в предыстории (если это применимо)
    related_class = models.ForeignKey('Classes', on_delete=models.CASCADE, null=True, blank=True)

    # Навыки
    skill_proficiency_choices = [
        ("Acrobatics", "Acrobatics"),
        ("Animal Handling", "Animal Handling"),
        ("Arcana", "Arcana"),
        ("Athletics", "Athletics"),
        ("Deception", "Deception"),
        ("History", "History"),
        ("Insight", "Insight"),
        ("Intimidation", "Intimidation"),
        ("Investigation", "Investigation"),
        ("Medicine", "Medicine"),
        ("Nature", "Nature"),
        ("Perception", "Perception"),
        ("Performance", "Performance"),
        ("Persuasion", "Persuasion"),
        ("Religion", "Religion"),
        ("Sleight of Hand", "Sleight of Hand"),
        ("Stealth", "Stealth"),
        ("Survival", "Survival"),
    ]
    skill_proficiencies = models.CharField(max_length=100, choices=skill_proficiency_choices, default=None)

    # Инструменты
    tool_proficiency_choices = [
        ("Alchemist's Supplies", "Alchemist's Supplies"),
        ("Any", "Any"),
        ("Any Artisan's Tool", "Any Artisan's Tool"),
        ("Artisan's Tools", "Artisan's Tools"),
        ("Brewer's Supplies", "Brewer's Supplies"),
        ("Calligrapher's Supplies", "Calligrapher's Supplies"),
        ("Carpenter's Tools", "Carpenter's Tools"),
        ("Cartographer's Tools", "Cartographer's Tools"),
        ("Cook's Utensils", "Cook's Utensils"),
        ("Disguise Kit", "Disguise Kit"),
        ("Forgery Kit", "Forgery Kit"),
        ("Gaming Set", "Gaming Set"),
        ("Herbalism Kit", "Herbalism Kit"),
        ("Musical Instrument", "Musical Instrument"),
        ("Navigator's Tools", "Navigator's Tools"),
        ("Poisoner's Kit", "Poisoner's Kit"),
        ("Thieves' Tools", "Thieves' Tools"),
        ("Tinker's Tools", "Tinker's Tools"),
        ("Vehicles (Air)", "Vehicles (Air)"),
        ("Vehicles (Land)", "Vehicles (Land)"),
        ("Vehicles (Space)", "Vehicles (Space)"),
        ("Vehicles (Water)", "Vehicles (Water)"),
    ]
    tool_proficiencies = models.CharField(max_length=100, choices=tool_proficiency_choices, default=None)

    # Языки
    language_proficiency_choices = [
        ("Abyssal", "Abyssal"),
        ("Any", "Any"),
        ("Any Standard", "Any Standard"),
        ("Aquan", "Aquan"),
        ("Auran", "Auran"),
        ("Celestial", "Celestial"),
        ("Deep Speech", "Deep Speech"),
        ("Draconic", "Draconic"),
        ("Dwarvish", "Dwarvish"),
        ("Elvish", "Elvish"),
        ("Giant", "Giant"),
        ("Gnomish", "Gnomish"),
        ("Goblin", "Goblin"),
        ("Ignan", "Ignan"),
        ("Infernal", "Infernal"),
        ("Other", "Other"),
        ("Primordial", "Primordial"),
        ("Sylvan", "Sylvan"),
        ("Terran", "Terran"),
        ("Thieves' Cant", "Thieves' Cant"),
        ("Undercommon", "Undercommon"),
    ]
    language_proficiencies = models.CharField(max_length=100, choices=language_proficiency_choices, default=None)

    # Показатели характеристик
    ability_scores = models.JSONField(default=dict)

    # Преимущества
    additional_benefits_choices = [
        ("Additional Spells", "Additional Spells"),
        ("Feat", "Feat"),
        ("Weapon Proficiencies", "Weapon Proficiencies"),
    ]
    additional_benefits = models.CharField(max_length=100, choices=additional_benefits_choices, default=None)

    # Источник
    source_choices = [
        ("Acquisitions Incorporated", "Acquisitions Incorporated"),
        ("Astral Adventurer’s Guide", "Astral Adventurer’s Guide"),
        ("Baldur’s Gate: Descent Into Avernus", "Baldur’s Gate: Descent Into Avernus"),
        ("Bigby Presents: Glory of the Giants", "Bigby Presents: Glory of the Giants"),
        ("Curse of Strahd", "Curse of Strahd"),
        ("Dragonlance: Shadow of the Dragon Queen", "Dragonlance: Shadow of the Dragon Queen"),
        ("Eberron: Rising from the Last War", "Eberron: Rising from the Last War"),
        ("Ghosts of Saltmarsh", "Ghosts of Saltmarsh"),
        ("Guildmasters’ Guide to Ravnica", "Guildmasters’ Guide to Ravnica"),
        ("Mythic Odysseys of Theros", "Mythic Odysseys of Theros"),
        ("Player’s Handbook", "Player’s Handbook"),
        ("Sigil and the Outlands", "Sigil and the Outlands"),
        ("Strixhaven: A Curriculum of Chaos", "Strixhaven: A Curriculum of Chaos"),
        ("Sword Coast Adventurer’s Guide", "Sword Coast Adventurer’s Guide"),
        ("The Book of Many Things", "The Book of Many Things"),
        ("The Wild Beyond the Witchlight", "The Wild Beyond the Witchlight"),
        ("Tomb of Annihilation", "Tomb of Annihilation"),
        ("Van Richten’s Guide to Ravenloft", "Van Richten’s Guide to Ravenloft"),
    ]
    source = models.CharField(max_length=100, choices=source_choices, default="Rebreya: Shadow of Progress")

    def __str__(self):
        return self.name

class Classes(models.Model):
    name = models.CharField(max_length=100)
    # Выбор костей хитов (ограниченные варианты)
    hit_dice_choices = [
        ("1d6", "1d6"),
        ("1d8", "1d8"),
        ("1d10", "1d10"),
        ("1d12", "1d12"),
    ]
    hit_dice = models.CharField(max_length=10, choices=hit_dice_choices)

    # Основные характеристики (ограниченные варианты)
    ability_choices = [
        ("Strength", "Strength"),
        ("Dexterity", "Dexterity"),
        ("Constitution", "Constitution"),
        ("Intelligence", "Intelligence"),
        ("Wisdom", "Wisdom"),
        ("Charisma", "Charisma"),
    ]
    primary_abilities = models.ManyToManyField('Ability', related_name='primary_classes')

    # Спасброски (ограниченные варианты, такие же как и основные характеристики)
    saving_throws = models.ManyToManyField('Ability', related_name='saving_throw_classes')

    # Владение доспехами (ограниченные варианты)
    armor_proficiency_choices = [
        ("Light Armor", "Light Armor"),
        ("Medium Armor", "Medium Armor"),
        ("Heavy Armor", "Heavy Armor"),
        ("Shields", "Shields"),
    ]
    armor_proficiencies = models.CharField(max_length=100, choices=armor_proficiency_choices, null=True, blank=True)

    # Владение оружием (ограниченные варианты)
    weapon_proficiency_choices = [
        ("Simple Weapons", "Simple Weapons"),
        ("Martial Weapons", "Martial Weapons"),
        ("Specific Weapon", "Specific Weapon"),  # Например, "Longsword", "Shortbow"
    ]
    weapon_proficiencies = models.CharField(max_length=100, choices=weapon_proficiency_choices, null=True,
                                            blank=True)

    # Владение инструментами (ограниченные варианты)
    tool_proficiency_choices = [
        ("Alchemist's Supplies", "Alchemist's Supplies"),
        ("Brewer's Supplies", "Brewer's Supplies"),
        ("Calligrapher's Supplies", "Calligrapher's Supplies"),
        ("Carpenter's Tools", "Carpenter's Tools"),
        ("Cartographer's Tools", "Cartographer's Tools"),
        ("Cook's Utensils", "Cook's Utensils"),
        ("Disguise Kit", "Disguise Kit"),
        ("Forgery Kit", "Forgery Kit"),
        ("Gaming Set", "Gaming Set"),
        ("Herbalism Kit", "Herbalism Kit"),
        ("Musical Instrument", "Musical Instrument"),
        ("Navigator's Tools", "Navigator's Tools"),
        ("Poisoner's Kit", "Poisoner's Kit"),
        ("Thieves' Tools", "Thieves' Tools"),
        ("Tinker's Tools", "Tinker's Tools"),
        ("Vehicles (Land)", "Vehicles (Land)"),
        ("Vehicles (Water)", "Vehicles (Water)"),
        ("Vehicles (Air)", "Vehicles (Air)"),
    ]
    tool_proficiencies = models.CharField(max_length=100, choices=tool_proficiency_choices, null=True, blank=True)

    # Навыки (ограниченные варианты)
    skill_choices = [
        ("Acrobatics", "Acrobatics"),
        ("Animal Handling", "Animal Handling"),
        ("Arcana", "Arcana"),
        ("Athletics", "Athletics"),
        ("Deception", "Deception"),
        ("History", "History"),
        ("Insight", "Insight"),
        ("Intimidation", "Intimidation"),
        ("Investigation", "Investigation"),
        ("Medicine", "Medicine"),
        ("Nature", "Nature"),
        ("Perception", "Perception"),
        ("Performance", "Performance"),
        ("Persuasion", "Persuasion"),
        ("Religion", "Religion"),
        ("Sleight of Hand", "Sleight of Hand"),
        ("Stealth", "Stealth"),
        ("Survival", "Survival"),
    ]
    skill_proficiencies = models.ManyToManyField('Skill', related_name='classes', blank=True)

    # Начальное снаряжение
    starting_equipment = models.JSONField(default=dict)

    # Заклинания и характеристика заклинателя
    spellcasting_ability = models.CharField(max_length=100, choices=ability_choices, null=True, blank=True)
    spells = models.ManyToManyField('Spells', related_name='classes', blank=True)

    # Подклассы
    subclasses = models.ManyToManyField('Subclass', related_name='classes')

    # Источник
    source_choices = [
        ("Player’s Handbook", "Player’s Handbook"),
        ("Tasha’s Cauldron of Everything", "Tasha’s Cauldron of Everything"),
        ("Xanathar’s Guide to Everything", "Xanathar’s Guide to Everything"),
    ]
    source = models.CharField(max_length=100, choices=source_choices, default="Rebreya: Shadow of Progress")

    # Особенности класса
    class_features = models.JSONField(default=dict)  # Список особенностей по уровням

    # Особые способности
    special_abilities = models.JSONField(default=dict)  # Особые способности класса

    def __str__(self):
        return self.name

    class Ability(models.Model):
        name = models.CharField(max_length=100)

        def __str__(self):
            return self.name

    class Skill(models.Model):
        name = models.CharField(max_length=100)

        def __str__(self):
            return self.name

class Subclass(models.Model):
    name = models.CharField(max_length=100)
    text = models.TextField()
    associated_class = models.ForeignKey(Classes, on_delete=models.CASCADE)
    level_features = models.JSONField(default=dict)  # Особенности подкласса по уровням

    def __str__(self):
        return self.name
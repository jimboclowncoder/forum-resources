Vue.component('elemento-raza', {
    props: ['format', 'name', 'comodin'],
    data() {
        return {
            item: Object.values(forumRaces).find(race => race.id.toLowerCase() === this.name.toLowerCase())
        }
    },
    template: `
    <div class="character-race">
        <strong>{{ item.name }}<template v-if="!format">:</template></strong>
        <ul v-if="format">
            <li v-for="message in item.content" v-html="message"></li>
        </ul>
        <template v-else v-for="message in item.content">
            <span v-html="message"></span>. 
        </template>
        <template v-if="comodin"><br><small v-html="comodin"></small></template>
    </div>
    `
});

Vue.component('elemento-grupo', {
    props: ['format', 'name', 'comodin'],
    data() {
        return {
            item: Object.values(forumGroups).find(group => group.id.toLowerCase() === this.name.toLowerCase())
        }
    },
    template: `
    <div class="character-group">
        <strong>{{ item.name }}<template v-if="!format">:</template></strong>
        <ul v-if="format">
            <li v-for="message in item.content" v-html="message"></li>
        </ul>
        <template v-else v-for="message in item.content">
            <span v-html="message"></span>. 
        </template>
        <template v-if="comodin"><br><small v-html="comodin"></small></template>
    </div>
    `
});

Vue.component('elemento-poderes', {
    props: ['name'],
    data() {
        return {
            item: Object.values(forumPowers).flat().find(power => power.name.toLowerCase() === this.name.toLowerCase())
        }
    },
    template: `
    <div class="character-power">
        <strong>{{ item.name }}</strong><br>
        <template v-for="message in item.content">
            <span v-html="message"></span>. 
        </template>
    </div>
    `
});

Vue.component('elemento-tienda', {
    props: ['name'],
    data() {
        return {
            item: Object.values(forumItems).flat().find(item => item.name.toLowerCase() === this.name.toLowerCase())
        }
    },
    template: `
    <div class="character-item">
        <strong>{{ item.name }}</strong><br>
        <span v-html="item.description"></span>. 
        <template v-for="message in item.content">
            <span v-html="message"></span>. 
        </template>
    </div>
    `
});

Vue.component('listado-poderes', {
    props: ['type'],
    data() {
        return {
            list: forumPowers[this.type].filter(item => item.hidden === false)
        }
    },
    template: `
    <ul>
        <li v-for="item in list" :key="item.name">
            <strong>{{ item.name }}</strong><br>
            <template v-for="message in item.content">
                <span v-html="message"></span>. 
            </template>
        </li>
    </ul>
    `
});

Vue.component('listado-tienda', {
    props: ['type'],
    data() {
        return {
            list: forumItems[this.type].filter(item => item.hidden === false)
        }
    },
    template: `
    <ul>
        <li v-for="item in list" :key="item.name">
            <strong>{{ item.name }} (<em>{{ item.price }}</em>)</strong><br>
            <span v-html="item.description"></span>. 
            <template v-for="message in item.content">
                <span v-html="message"></span>. 
            </template>
        </li>
    </ul>
    `
});

Vue.component('cuerpo-expediente', {
    props: ['race', 'group', 'rank', 'attributes', 'efforts', 'proficiencies', 'powers', 'equipment', 'augments', 'comodinRace', 'comodinGroup', 'extraHearts', 'extraAttributes', 'extraEfforts', 'extraProficiencies', 'extraPowers', 'extraAugments'],
    computed: {
        characterBonus() {
            const rank = parseInt(this.rank);

            if (rank < 1) {
                return 0;
            } else if (rank < 4) {
                return 2;
            } else if (rank < 7) {
                return 4;
            } else {
                return 6;
            }
        },
        characterHearts() {
            const rank = parseInt(this.rank);
            const extra = parseInt(this.extraHearts);

            if (rank < 5) {
                return 2 + extra;
            } else if (rank < 10) {
                return 4 + extra;
            } else {
                return 6 + extra;
            }
        },
        characterPowerCount() {
            const rank = parseInt(this.rank);
            const extra = parseInt(this.extraPowers.split(',').filter(item => item !== '').length);

            if (rank < 1) {
                return 0 + extra;
            } else if (rank < 4) {
                return 1 + extra;
            } else if (rank < 5) {
                return 2 + extra;
            } else if (rank < 7) {
                return 3 + extra;
            } else if (rank < 10) {
                return 4 + extra;
            } else {
                return 5 + extra;
            }
        },
        characterAttributes() {
            return this.attributes.split(',').map((item, index) => {
                let name;
                let short;

                switch (index) {
                    case 1:
                        name = 'Destreza';
                        short = 'DES';
                        break;

                    case 2:
                        name = 'Constitución';
                        short = 'CON';
                        break;

                    case 3:
                        name = 'Inteligencia';
                        short = 'INT';
                        break;

                    case 4:
                        name = 'Sabiduría';
                        short = 'SAB';
                        break;

                    case 5:
                        name = 'Carisma';
                        short = 'CAR';
                        break;

                    default:
                        name = 'Fuerza';
                        short = 'FUE';
                        break;
                }

                return {
                    name,
                    short,
                    value: parseInt(item),
                }
            });
        },
        characterExtraAttributes() {
            return this.extraAttributes.split(',').map((item, index) => {
                let name;
                let short;

                switch (index) {
                    case 1:
                        name = 'Destreza';
                        short = 'DES';
                        break;

                    case 2:
                        name = 'Constitución';
                        short = 'CON';
                        break;

                    case 3:
                        name = 'Inteligencia';
                        short = 'INT';
                        break;

                    case 4:
                        name = 'Sabiduría';
                        short = 'SAB';
                        break;

                    case 5:
                        name = 'Carisma';
                        short = 'CAR';
                        break;

                    default:
                        name = 'Fuerza';
                        short = 'FUE';
                        break;
                }

                return {
                    name,
                    short,
                    value: parseInt(item),
                }
            });
        },
        characterEfforts() {
            return this.efforts.split(',').map((item, index) => {
                let name;
                let base;

                switch (index) {
                    case 1:
                        name = 'Avanzado';
                        base = 2;
                        break;

                    case 2:
                        name = 'Tecnológico';
                        base = 4;
                        break;

                    case 3:
                        name = 'Biótico';
                        base = 4;
                        break;

                    case 4:
                        name = 'Crítico';
                        base = 8;
                        break;

                    default:
                        name = 'Básico';
                        base = 0;
                        break;
                }

                return {
                    name,
                    value: base + parseInt(item),
                }
            });
        },
        characterExtraEfforts() {
            return this.extraEfforts.split(',').map((item, index) => {
                let name;
                let base;

                switch (index) {
                    case 1:
                        name = 'Avanzado';
                        base = 0;
                        break;

                    case 2:
                        name = 'Tecnológico';
                        base = 0;
                        break;

                    case 3:
                        name = 'Biótico';
                        base = 0;
                        break;

                    case 4:
                        name = 'Crítico';
                        base = 0;
                        break;

                    default:
                        name = 'Básico';
                        base = 0;
                        break;
                }

                return {
                    name,
                    value: base + parseInt(item),
                }
            });
        },
        characterProficiencies() {
            return [...this.proficiencies.split(',').map(proficiency => proficiency.trim()), ...this.extraProficiencies.split(',').map(proficiency => proficiency.trim())];
        },
        characterAttributeSkills() {
            return this.characterAttributes.map(attribute => {
                const { name, short, value } = attribute;
                const extra = this.characterExtraAttributes.find(data => data.short === short).value;

                return {
                    name,
                    short,
                    value: value + extra + (this.characterProficiencies.indexOf(name) > -1 ? this.characterBonus : 0),
                }
            });
        },
        characterGeneralSkills() {
            const skills = {
                FUE: ['Atletismo'],
                DES: ['Prestidigitación', 'Vehículos', 'Sigilo'],
                CON: [],
                INT: ['Ciencia', 'Electrónica', 'Historia'],
                SAB: ['Perspicacia', 'Supervivencia', 'Animales'],
                CAR: ['Engaño', 'Intimidación', 'Persuasión']
            };

            return Object.entries(skills).map(skill => {
                const attribute = this.characterAttributes.find(data => data.short === skill[0]).value;
                const extra = this.characterExtraAttributes.find(data => data.short === skill[0]).value;

                return skill[1].map(element => {
                    return {
                        name: element,
                        attribute: skill[0],
                        value: attribute + extra + (this.characterProficiencies.indexOf(element) > -1 ? this.characterBonus : 0),
                    }
                });
            });
        },
        characterCombatSkills() {
            const skills = {
                FUE: ['Contundentes', 'Escopetas', 'Pesadas'],
                DES: ['Filo', 'Fusiles', 'Granadas', 'Pistolas', 'Rifles', 'Subfusiles'],
                CON: [],
                INT: ['Tecnología'],
                SAB: ['Biótica'],
                CAR: []
            };

            return Object.entries(skills).map(skill => {
                const attribute = this.characterAttributes.find(data => data.short === skill[0]).value;
                const extra = this.characterExtraAttributes.find(data => data.short === skill[0]).value;

                return skill[1].map(element => {
                    return {
                        name: element,
                        attribute: skill[0],
                        value: attribute + extra + (this.characterProficiencies.indexOf(element) > -1 ? this.characterBonus : 0),
                    }
                });
            });
        },
        characterPowers() {
            return [...this.powers.split(',').map(item => item.trim()).filter(item => item !== ''), ...this.extraPowers.split(',').map(item => item.trim()).filter(item => item !== '')].sort();
        },
        characterEquipment() {
            return this.equipment.split(',').sort().map(item => item.trim()).filter(item => item !== '');
        },
        characterAugments() {
            return this.augments.split(',').sort().map(item => item.trim()).filter(item => item !== '');
        },
        characterAugmentSlots() {
            let extraSlots = parseInt(this.extraAugments);

            if (extraSlots === NaN) {
                extraSlots = 0;
            }

            return this.characterEfforts[1].value + extraSlots - 2;
        }
    },
    template: `
    <cuerpo-interior title="Características">
        <div class="character-perks">
            <elemento-raza :name="race" :comodin="comodinRace" format="true"></elemento-raza>
            <elemento-grupo :name="group" :comodin="comodinGroup" format="true"></elemento-grupo>
        </div>
        <div class="character-header">
            <div class="character-header-element character-hearts">
                <div class="character-header-element-title">Corazones</div>
                <div class="character-header-element-content">
                    <i v-for="n in characterHearts" class="fa-solid fa-heart"></i>
                </div>
            </div>
            <div class="character-header-element character-bonus">
                <div class="character-header-element-title">Bonificador</div>
                <div class="character-header-element-content">
                    +{{ characterBonus }}
                </div>
            </div>
        </div>
        <div class="character-stats">
            <ul class="character-attributes no-style">
                <li v-for="(attribute, index) in characterAttributes" class="character-attribute">
                    <div class="character-attribute-panel character-panel-main">
                        <div class="character-attribute-main">
                            <div class="character-attribute-value"><template v-if="attribute.value + characterExtraAttributes[index].value > -1">+</template>{{ attribute.value + characterExtraAttributes[index].value }}</div>
                            <div class="character-attribute-name">{{ attribute.name }}</div>
                        </div>
                        <div class="character-attribute-sub">
                            <div class="character-attribute-group">
                                <div class="character-attribute-group-value">{{ attribute.value }}</div>
                                <div class="character-attribute-group-name">Base</div>
                            </div>
                            <div class="character-attribute-group">
                                <div class="character-attribute-group-value">{{ characterExtraAttributes[index].value }}</div>
                                <div class="character-attribute-group-name">Extra</div>
                            </div>
                        </div>
                    </div>
                    <div class="character-attribute-panel">
                        <div class="character-attribute-proficiencies">
                            <ul class="proficency-list no-style">
                                <li v-for="proficency in characterGeneralSkills[index]"><template v-if="proficency.value > -1">+</template>{{ proficency.value }} {{ proficency.name }}</li>
                            </ul>
                            <ul class="proficency-list no-style">
                                <li v-for="proficency in characterCombatSkills[index]"><template v-if="proficency.value > -1">+</template>{{ proficency.value }} {{ proficency.name }}</li>
                            </ul>
                        </div>
                        <div class="character-attribute-fallback">
                            <small><template v-if="characterAttributeSkills[index].value > -1">+</template>{{ characterAttributeSkills[index].value }} en las <em>Tiradas de Salvación</em> de <strong>{{ characterAttributeSkills[index].name }}</strong></small>
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="character-efforts no-style">
                <li v-for="(effort, index) in characterEfforts" class="character-effort">
                    <div class="character-effort-panel character-panel-main">
                        <div class="character-effort-main">
                            <div class="character-effort-value"><template v-if="effort.value + characterExtraEfforts[index].value > -1">+</template>{{ effort.value + characterExtraEfforts[index].value }}</div>
                            <div class="character-effort-name">Esfuerzo {{ effort.name }}</div>
                        </div>
                        <div class="character-effort-sub">
                            <div class="character-effort-group">
                                <div class="character-effort-group-value">{{ effort.value }}</div>
                                <div class="character-effort-group-name">Base</div>
                            </div>
                            <div class="character-effort-group">
                                <div class="character-effort-group-value">{{ characterExtraEfforts[index].value }}</div>
                                <div class="character-effort-group-name">Extra</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="characterPowers.length" class="character-extras">
            <h4 class="character-extras-title">Poderes <span class="character-extras-count">({{ characterPowers.length }}/{{ characterPowerCount }})</span></h4>
            <ul class="character-extras-content character-powers no-style">
                <li v-for="power in characterPowers" class="character-extras-element">
                    <elemento-poderes :name="power"></elemento-poderes>
                </li>
            </ul>
        </div>
        <div v-if="characterEquipment.length" class="character-extras">
            <h4 class="character-extras-title">Equipo <span class="character-extras-count">({{ characterEquipment.length }}/15)</span></h4>
            <ul class="character-extras-content character-equipment no-style">
                <li v-for="item in characterEquipment" class="character-extras-element">
                    <elemento-tienda :name="item"></elemento-tienda>
                </li>
            </ul>
        </div>
        <div v-if="characterAugments.length" class="character-extras">
            <h4 class="character-extras-title">Aumentos <span class="character-extras-count">({{ characterAugments.length }}/{{ characterAugmentSlots }})</span></h4>
            <ul class="character-extras-content character-augments no-style">
                <li v-for="item in characterAugments" class="character-extras-element">
                    <elemento-tienda :name="item"></elemento-tienda>
                </li>
            </ul>
        </div>
    </cuerpo-interior>
    `
});
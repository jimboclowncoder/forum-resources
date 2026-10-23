Vue.component('elemento-raza', {
    props: ['name'],
    data() {
        return {
            item: Object.values(forumRaces).find(race => race.id.toLowerCase() === this.name.toLowerCase())
        }
    },
    template: `
    <div class="character-race">
        <table>
            <thead>
                <tr>
                    <th colspan=6>PA</th>
                    <th>PH</th>
                    <th>PT</th>
                    <th>PD</th>
                    <th>PG</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan=6>{{ item.content.pa }}<span v-if="item.asterisk">*</span></td>
                    <td>{{ item.content.ph }}</td>
                    <td>{{ item.content.pt }}</td>
                    <td>{{ item.content.pd }}</td>
                    <td>{{ item.content.pg }}</td>
                </tr>
            </tbody>
        </table>
        <p v-if="item.asterisk" class="mt-2">
            <small v-html="'*' + item.asterisk"></small>
        </p>
    </div>
    `
});

Vue.component('elemento-tienda', {
    props: ['name', 'extra'],
    template: `
    <div class="storelist-element">
        <strong>{{ name }}</strong><template v-if="extra">, <em>{{ extra }}</em></template>
        <slot></slot>
    </div>
    `
});

Vue.component('elemento-ficha', {
    props: ['name', 'extra'],
    template: `
    <li>
        <elemento-tienda :name="name" :extra="extra">
            <br /><slot></slot>
        </elemento-tienda>
    </li>
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
    <ul class="storelist-main">
        <li v-for="item in list" :key="item.name">
            <elemento-tienda :name="item.name" :extra="item.price">
                <br><small v-html="item.content + '.'"></small>
            </elemento-tienda>
        </li>
    </ul>
    `
});

Vue.component('cuerpo-expediente', {
    props: ['rank', 'subspecies', 'bonus', 'skills'],
    computed: {
        characterPH() {
            const rank = parseInt(this.rank);

            if (rank < 2) {
                return 1;
            } else if (rank < 4) {
                return 2;
            } else if (rank < 8) {
                return 3;
            } else {
                return 4;
            }
        },
        characterPT() {
            const rank = parseInt(this.rank);

            if (rank < 3) {
                return 1;
            } else if (rank < 7) {
                return 2;
            } else if (rank < 9) {
                return 3;
            } else {
                return 4;
            }
        },
        characterPD() {
            const rank = parseInt(this.rank);

            if (rank < 5) {
                return 1;
            } else if (rank < 10) {
                return 2;
            } else {
                return 3;
            }
        },
        characterPG() {
            const rank = parseInt(this.rank);

            if (rank < 5) {
                return 1;
            } else if (rank < 10) {
                return 2;
            } else {
                return 3;
            }
        },
        characterBonus() {
            const baseBonus = forumRaces.find(race => race.id.toLowerCase() === this.subspecies.toLowerCase());
            const isSpecial = baseBonus.content.pa === '+2 a CON, AGI, SAB, INT, PER o EST' ? this.bonus : `${baseBonus.content.pa}${this.bonus === '' ? '' : ` (${this.bonus})`}`;
            const racialBonus = baseBonus.content.pa === 0 ? '-' : isSpecial;

            return {
                ...baseBonus,
                content: {
                    pa: racialBonus,
                    ph: this.characterPH + baseBonus.content.ph,
                    pt: this.characterPT + baseBonus.content.pt,
                    pd: this.characterPD + baseBonus.content.pd,
                    pg: this.characterPG + baseBonus.content.pg,
                }
            }
        },
        characterSkills() {
            const transate = ['CON', 'AGI', 'SAB', 'INT', 'PER', 'EST'];

            return this.skills.split(',').map((value, index) => {
                return {
                    name: transate[index],
                    value: parseInt(value)
                }
            });
        }
    },
    template: `
    <cuerpo-interior title="Características">
        <div class="character-panel character-perks">
            <h5>Modificadores</h5>
            <ul>
                <li>
                    <strong>Puntos de Atributo</strong>: {{ characterBonus.content.pa }}<span v-if="characterBonus.asterisk">*</span>.
                    <p v-if="characterBonus.asterisk">
                        <small v-html="'*' + characterBonus.asterisk"></small>
                    </p>
                </li>
                <li><strong>Puntos de Destino</strong>: {{ characterBonus.content.pd }}.</li>
                <li><strong>Puntos de Golpe</strong>: {{ characterBonus.content.pg }}.</li>
            </ul>
        </div>
        <div class="character-panel character-skills">
            <h5>Atributos</h5>
            <ul>
                <li v-for="skill in characterSkills" :class="'character-skill character-skill-' + FNR.utility.genSlug(skill.name)">
                    <div class="skill-block">
                        <div class="skill-name">{{ skill.name }}</div>
                        <div class="skill-value">{{ skill.value }}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="character-panel character-abilities" v-if="this.$slots.abilities !== undefined">
            <h5>Habilidades <span>({{ this.$slots.abilities.length }}/{{ characterBonus.content.ph }})</span></h5>
            <ul>
                <slot name="abilities"></slot>
            </ul>
        </div>
        <div class="character-panel character-backgrounds" v-if="this.$slots.backgrounds !== undefined">
            <h5>Trasfondos <span>({{ this.$slots.backgrounds.length }}/{{ characterBonus.content.pt }})</span></h5>
            <ul>
                <slot name="backgrounds"></slot>
            </ul>
        </div>
        <div class="character-panel character-objects" v-if="this.$slots.objects !== undefined">
            <h5>Objetos</h5>
            <ul>
                <slot name="objects"></slot>
            </ul>
        </div>
        <div class="character-panel character-npcs" v-if="this.$slots.npcs !== undefined">
            <h5>PNJs</h5>
            <ul>
                <slot name="npcs"></slot>
            </ul>
        </div>
    </cuerpo-interior>
    `
});
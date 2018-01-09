import {Component, OnInit} from '@angular/core';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    const newHero: Hero = new Hero();
    newHero.id = this.getNewId();
    newHero.name = name;
    this.heroService.addHero(newHero)
      .subscribe(hero => {
        this.heroes.push(newHero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  getNewId() {
    let maxId = 0;
    this.heroes.forEach(hero => {
        if (hero.id > maxId) {
          maxId = hero.id;
        }
      }
    );
    return maxId + 1;
  }

}

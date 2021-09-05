import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  sub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') addItemForm: NgForm;


  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.sub = this.slService.startingEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.addItemForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      }
    );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slService.updateIngredients(this.editedItemIndex, newIngredient);

    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode= false;
    this.addItemForm.reset();
  }

  onClear(){
    this.addItemForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }



}
//import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../modal.service';
import { expenseService } from '../../services/expense.service';
import { BudgetService } from '../../services/budget.service';
import { commonService } from '../../services/common.service';
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})
@Injectable()
export class AddFormComponent implements OnInit {

  expenseForm: FormGroup;
  budgetForm: FormGroup;
  @Output() dataAdded: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('AddFormComponent') private modalContent: TemplateRef<AddFormComponent>
  @Output() newConfirmationEvent = new EventEmitter<string>();
  @Input() modalStyle: any;
  @Input() title: any;
  @Input() type: any;
  @Input() message: any;
  @Input() modalButtonColor: any;
  public categoriesList = []
  dynamicForm: FormGroup;
  private modalRef!: NgbModalRef;
  // categoriesList: { category: string; subcategories: string[]; }[];

  constructor(config: NgbModalConfig,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private expenseservice: expenseService,
    private budgetService: BudgetService,
    private commonService: commonService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    var date = new Date()
    // this.getCategoriesList()
    this.expenseForm = this.formBuilder.group({
      expenseName: [''],
      expenseCategory: [''],
      expenseAmount: [],
      expenseDate: [],

    }),

      this.budgetForm
      = this.formBuilder.group({
        //budgetName: [''],
        budgetAmount: [],
        budgetDate: [],

      })
    this.categoriesList = [
      {
        category: "Food",
        subcategories: ["Groceries", "Dining Out", "Snacks/Drinks"]
      },
      {
        category: "Shopping",
        subcategories: ["Clothing", "Electronics", "Household Items"]
      },
      {
        category: "Healthcare",
        subcategories: ["Doctor Visits", "Prescriptions/Medications", "Health Insurance Premiums"]
      },
      {
        category: "Housing",
        subcategories: ["Rent/Mortgage", "Utilities", "Home/Rental Insurance"]
      },
      {
        category: "Bill Payments",
        subcategories: ["Internet", "Phone", "Cable/Satellite TV", "Other Monthly Bills"]
      },
      {
        category: "Education",
        subcategories: ["Tuition", "Books/Supplies", "Courses/Workshops"]
      },
      {
        category: "Transportation",
        subcategories: ["Gasoline/Fuel", "Public Transportation", "Vehicle Payments", "Insurance", "Maintenance/Repairs", "Parking/Tolls"]
      }
    ];
  }

  getCategoriesList() {
    try {
      this.commonService.getCategoriesList().subscribe(
        (Response) => {
          //this.categoriesList = Response.categoriesList
          return {
          }
        },
        (error) => {

        }
      )
    } catch (error) {

    }
  }

  onSubmit() {
    this.expenseservice.addExpense(this.expenseForm.value).subscribe(
      (response) => {
        this.activeModal.close(response);
        return response
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    )

  }

  onbudgetSubmit() {
    this.budgetService.adbudget(this.budgetForm.value).subscribe(
      response => {
        console.log("Response:", response);
        this.activeModal.close(response);
        this.dataAdded.emit();
        return response
      },
      error => {
        console.error("Error:", error);
        // Handle the error here
      }
    )

  }

  closeModal() {

    this.modalService.dismissAll();

  }
}
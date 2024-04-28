import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef,AfterViewInit } from '@angular/core';
import { AddFormComponent } from '../../shared/add-form/add-form.component';
import { ModalService } from '../../shared/modal.service';
import { expenseService } from '../../services/expense.service';
import { AuthService } from '../../auth/auth.service';
import { commonService } from '../../services/common.service';
import { Chart, registerables } from 'chart.js/auto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppCustomModalComponent } from '../../shared/app-custom-modal/app-custom-modal.component';
import { ChangeDetectorRef } from '@angular/core';

// Chart.register(...registerables)


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , AfterViewInit{
  showModal: boolean = false;
  @ViewChild(AddFormComponent) addFormComponent: AddFormComponent | undefined;
  @ViewChild(AppCustomModalComponent) AppCustomModalComponent: AppCustomModalComponent | undefined;
  // @ViewChild('mychart') mychart: any;
  @ViewChild('dynamicFormContainer', { read: ViewContainerRef }) dynamicFormContainer: ViewContainerRef;

  canvas: any
  ctx: any
  parentForm: FormGroup;



  //private addFormComponent: AddFormComponent;
  constructor(private ModalService: ModalService,
    private expenseservice: expenseService,
    private authservice: AuthService,
    private commonservice: commonService,
    private formBuilder: FormBuilder,
    private changedetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  public allExpense
  public totalExpense
  public recntExpense
  public totalRecentExpense
  public loginUser
  public chart
  public backgroundColor
  public foodExpense
  public expensesByCategory = {};
  public expensesArray
  public categoryTotal
  public categoryTotals: { [category: string]: { total: number, percentage: number } }
  public loginUsers
  public monthlyTotalExpense = 0
  public monthlyExpenses
  ngOnInit(): void {
    this.getAllExpense()
    this.getRecentExpenses()
    this.loginUsers = this.commonservice.getLoggedInUser();
    this.getCurentmonthExpense()
    console.log("call")
    this.expenseservice.fun()
    this.canvas = document.getElementById('myChart')

  }
  ngAfterViewInit():void{
    console.log("calll.....123456========>>>>>>>>>>")
  }
  createDynamicForm(): void {
    // this.dynamicFormContainer.clear();
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AppCustomModalComponent);
    // const dynamicComponent = this.dynamicFormContainer.createComponent(componentFactory);
    // dynamicComponent.instance.Formconfig = this.userFormConfig;
    // dynamicComponent.instance.formSubmit.subscribe(data => {
    //   console.log('Form submitted:', data);
    //   // Handle form submission data here
    // });
  }


  createChart() {
    const monthlyBudget = 100000;
    const remainingBudget = monthlyBudget - this.monthlyTotalExpense;
    const chartOptions = {
      // plugins: {
      //   title: {
      //     display: true,
      //     text: 'Custom Chart Title',
      //     color: 'white' // Set label color to white
      //   }
      // }
      aspectRatio: 2.5,
      color: 'white'
    };
    this.chart = new Chart("MyChart", {
      type: 'doughnut',

      data: {
        labels: [
          // 'monthlyExpenses',
          // 'remainingBudget',
        ],
        datasets: [
          { label: 'Expenses', data: [this.monthlyTotalExpense, remainingBudget], hoverOffset: 4 },
          // { label: 'Savings', data: [500] },
          //  { label: 'Current Balance', data: [remainingBudget] }
          //{ label: "blue", data: ['5'], }
        ],
      },

      options: chartOptions
    });
  }

  modalStyle: string = 'modal-style-primary';
  modalTitle: string = 'Info Confirmation';
  modalBody: string = 'This is a Information Confirmation message';
  modalButtonColor: string = 'btn-primary';
  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      console.log(value);
    }
  }
  isModalOpen: boolean = false;
  data: string = 'Initial Data';
  async openModal({ title: title, type: type }){
    this.ModalService.add({ title: title, type: type, message: "pass your message ", body: "pass body", cancelBtnText: "No", }).then(async (updatedData) => {
      console.log("🚀 ~ HomeComponent ~ this.ModalService.add ~ updatedData:", updatedData)
      this.allExpense = []
      console.log("🚀 ~ HomeComponent ~ this.ModalService.add ~ this.allExpense:", this.allExpense)
      this.changedetectorRef.detectChanges();
      await this.getAllExpense()
    })
      .catch(() => {
        console.log('Modal dismissed');
      });
  }
  updateData(): void {
    this.data = 'Updated Data';
    // Trigger change detection manually
    this.changedetectorRef.detectChanges();
  }
  getRecentExpenses() {
    interface LoggedInUser {
      userId: string;
      // Add other properties if present
    }
    let temp: LoggedInUser = this.commonservice.getLoggedInUser()

    this.expenseservice.getRecentExpenses(temp).subscribe(
      async (response) => {
        console.log("🚀 ~ response:", response)
        this.recntExpense = response.expense
        this.totalRecentExpense = 0;
        for (let i = 0; i < this.recntExpense.length; i++) {
          this.totalRecentExpense += this.recntExpense[i].expenseAmount;
        }
      },
      (error) => {
        console.log("🚀 ~ HomeComponent ~ getRecentExpenses ~ error:", error)
      }

    )
  }

  getAllExpense() {
    console.log("call after add")
    this.expenseservice.getExpense().subscribe(
      (response) => {
        this.allExpense = response.expense
        console.log("🚀 ~ HomeComponent ~ getAllExpense ~ this.allExpense:", this.allExpense)
        this.totalExpense = 0;
        for (let i = 0; i < this.allExpense.length; i++) {
          this.totalExpense += this.allExpense[i].expenseAmount;
        }
        return  this.allExpense
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    )
  }

  getExpensesbyCategory() {

    const expensesByCategory: { [category: string]: any[] } = {};

    this.monthlyExpenses.forEach(expense => {
      const category = expense.expenseCategory;
      if (!expensesByCategory[category]) {
        expensesByCategory[category] = [];
      }
      expensesByCategory[category].push(expense);
    });
    // Calculate total expenses for each category and update expensesArray
    this.expensesArray = Object.keys(expensesByCategory).map(category => {
      const categoryTotal = expensesByCategory[category].reduce((total, expense) => {
        return total + expense.expenseAmount;
      }, 0);

      return {
        category: category,
        expenses: expensesByCategory[category],
        categoryTotal: categoryTotal,
        categoryPercentage: 0
      };
    });
    const totalExpense = this.expensesArray.reduce((total, expense) => {
      return total + expense.categoryTotal;
    }, 0);
    this.expensesArray.forEach(expense => {
      expense.categoryPercentage = Math.round((expense.categoryTotal / totalExpense) * 100);
    });
  }

  getExpenseWidth(paramsExpense: any): string {
    for (const key in this.expensesArray) {
      if (Object.prototype.hasOwnProperty.call(this.expensesArray, key)) {
        const element = this.expensesArray[key];
        if (element.category == paramsExpense.category) {
          return element.categoryPercentage + '%';
        }
      }
    }
    return '0%'
  }

  getExpenseColor(paramsExpense: any): string {
    switch (paramsExpense.category.toLowerCase()) {
      case 'food':
        return '#F97316';
      case 'shopping':
        return '#F59E0B'
      case 'healthcare':
        return '#84CC16'
      case 'housing':
        return '#22C55E'
      case 'bill payments':
        return '#FF5733'
      case 'education':
        return '#36A2EB'
      case 'transportation':
        return '#FFC300';
      default:
        return 'gray'
    }

  }


  getCurentmonthExpense() {
    if (!this.loginUsers) {
      console.error("Login user information is missing.");
      return;
    }
    const params = {
      userId: this.loginUsers.useId
    };

    this.expenseservice.getMonthExpense(params).subscribe(
      async (response) => {
        this.monthlyExpenses = response.expense
        this.monthlyExpenses.forEach(eachexpense => {
          this.monthlyTotalExpense = this.monthlyTotalExpense + eachexpense.expenseAmount
        });
        await this.createChart()
        await this.getExpensesbyCategory()
      },
      (error) => {
        console.error("Error fetching current month expenses:", error);
        // Handle error appropriately, e.g., show a toast message or display a user-friendly error on the UI
      }
    );
  }

  openModals(): void {
    //this.userFormConfig = { ... };
  }


  onSubmit() {
    // Handle form submission
  }
  closeModal() {
    this.showModal = false;
  }

}

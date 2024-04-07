import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AddFormComponent } from '../../shared/add-form/add-form.component';
import { ModalService } from '../../shared/modal.service';
import { expenseService } from '../../services/expense.service';
import { AuthService } from '../../auth/auth.service';
import { commonService } from '../../services/common.service';
import { Chart, registerables } from 'chart.js/auto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Formconfig } from '../../interface/formconfig';
import { AppCustomModalComponent } from '../../shared/app-custom-modal/app-custom-modal.component';
// Chart.register(...registerables)


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  showModal: boolean = false;
  @ViewChild(AddFormComponent) addFormComponent: AddFormComponent | undefined;
  @ViewChild(AppCustomModalComponent) AppCustomModalComponent: AppCustomModalComponent | undefined;
  // @ViewChild('mychart') mychart: any;
  @ViewChild('dynamicFormContainer', { read: ViewContainerRef }) dynamicFormContainer: ViewContainerRef;

  canvas: any
  ctx: any
  parentForm: FormGroup;
  userFormConfig: Formconfig = {
    fields: {
      // name: '',
      email: 'Email',
      phone: 'Phone'
    },
    validations: {
      // email: [Validators.required, Validators.email]
    }
  };


  //private addFormComponent: AddFormComponent;
  constructor(private ModalService: ModalService,
    private expenseservice: expenseService,
    private authservice: AuthService,
    private commonservice: commonService,
    private formBuilder: FormBuilder,
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
    // this.initializeForm();
    this.getAllExpense()
    this.getRecentExpenses()
    this.loginUsers = this.commonservice.getLoggedInUser();
    this.getCurentmonthExpense()
    console.log("call")
    this.expenseservice.fun()
    this.canvas = document.getElementById('myChart')
    const chartData = [
      //{ label: 'remainingBudget', data: [remainingBudget, monthlyExpenses], backgroundColor: this.backgroundColor }
    ];

    //   data: {
    //     labels: [
    //       'remainingBudget',
    //       'monthlyExpenses',
    //       'Yellow'
    //     ],
    //     datasets: chartData,
    //   },

    //   options: {
    //     cutout: 50,
    //     circumference: 180,
    //     aspectRatio: 2.5,
    //     responsive: true,
    //     animation: {
    //       animateScale: true,
    //       animateRotate: true
    //     }

    //   }
    // });
  }
  createDynamicForm(): void {
    this.dynamicFormContainer.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AppCustomModalComponent);
    const dynamicComponent = this.dynamicFormContainer.createComponent(componentFactory);
    dynamicComponent.instance.Formconfig = this.userFormConfig;
    dynamicComponent.instance.formSubmit.subscribe(data => {
      console.log('Form submitted:', data);
      // Handle form submission data here
    });
  }
  initializeForm(): void {
    const formControlsConfig = {};
    for (const key of Object.keys(this.userFormConfig.fields)) {
      formControlsConfig[key] = ['', this.userFormConfig.validations[key] || []];
    }
    this.parentForm = this.formBuilder.group(formControlsConfig);
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
          'monthlyExpenses',
          'remainingBudget',
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

  async openModal({ title: title, type: type }) {
    this.ModalService.add({ title: title, type: type, message: "pass your message ", body: "pass body", cancelBtnText: "No", }).then((updatedData) => {
      this.getAllExpense()
    })
      .catch(() => {
        console.log('Modal dismissed');
      });
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
    this.expenseservice.getExpense().subscribe(
      (response) => {
        this.allExpense = response.expense
        this.totalExpense = 0;
        for (let i = 0; i < this.allExpense.length; i++) {
          this.totalExpense += this.allExpense[i].expenseAmount;
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
      //  console.log("call", Allexpense)
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

    // Calculate percentage for each category and update expensesArray
    this.expensesArray.forEach(expense => {
      expense.categoryPercentage = Math.round((expense.categoryTotal / totalExpense) * 100);
    });
    if (this.expensesArray) {
      // this.getTotalExpenseAmount()

    }
    let total = this.expensesArray.reduce((total, expense) => {
      // console.log('Expense:', expense); // Add console log for each expense
      //return total + expense.amount;
    }, 0);
  }

  getExpenseWidth(paramsExpense: any): string {
    for (const key in this.expensesArray) {
      if (Object.prototype.hasOwnProperty.call(this.expensesArray, key)) {
        //console.log("🚀 ~ HomeComponent ~ getExpenseWidth ~ key:", key)
        const element = this.expensesArray[key];
        if (element.category == paramsExpense.category) {
          return element.categoryPercentage + 'px';
        }
      }
    }
    return 'px'
  }

  getExpenseColor(paramsExpense: any): string {
    switch (paramsExpense.category.toLowerCase()) {
      case 'food':
        return '#F97316';
      case 'transport':
        return '#F59E0B'
      case 'shoping':
        return '#84CC16'
      case 'healthcare':
        return "#22C55E"
      case 'clothing':
        return '#84CC16'
      case 'housing':
        return ''
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
    this.ModalService.openModal(this.userFormConfig);
  }


  onSubmit() {
    // Handle form submission
  }
  closeModal() {
    this.showModal = false;
  }

}

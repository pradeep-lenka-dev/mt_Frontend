import { Component, OnInit, ViewChild} from '@angular/core';
import { AddFormComponent } from '../../shared/add-form/add-form.component';
import { ModalService } from '../../shared/modal.service';
import { expenseService } from '../../services/expense.service';
import { commonService } from '../../services/common.service';
import { Chart, registerables } from 'chart.js/auto';
import { FormGroup,} from '@angular/forms';
import { AppCustomModalComponent } from '../../shared/app-custom-modal/app-custom-modal.component';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  showModal: boolean = false;
  @ViewChild(AddFormComponent) addFormComponent: AddFormComponent | undefined;
  @ViewChild(AppCustomModalComponent) AppCustomModalComponent: AppCustomModalComponent | undefined;

  canvas: any
  ctx: any
  parentForm: FormGroup;

  constructor(private ModalService: ModalService,
    private expenseservice: expenseService,
    private commonservice: commonService,
    private budgetservice: BudgetService,
  ) { }
  public allExpense
  public totalExpense
  public recntExpense
  public totalRecentExpense
  public chart
  public expensesByCategory = {};
  public expensesArray
  public categoryTotal
  public loginUsers
  public monthlyTotalExpense = 0
  public monthlyExpenses
  public curentUser 
  public monthlyBudget
  public remainingBudget = 0
  ngOnInit(): void {
    this.getcurentMonthBudget()
    this.getAllExpense()
    this.getRecentExpenses()
    this.loginUsers = this.commonservice.getLoggedInUser();
    this.getCurentmonthExpense()
    this.expenseservice.fun()
    this.canvas = document.getElementById('myChart')

  }

  createChart() {

    this.remainingBudget =  this.remainingBudget + this.monthlyBudget - this.monthlyTotalExpense;
    if(this.remainingBudget < 0){
      this.remainingBudget = 0
    }
    const chartOptions = {
      aspectRatio: 2.5,
      color: 'white'
    };
    this.chart = new Chart("MyChart", {
      
      type: 'doughnut',

       data : {
        labels: [
          'monthlyTotalExpense',
          // 'Blue',
          'remainingBudget'
        ],
        datasets: [{
          // label: 'My First Dataset',
          data: [this.monthlyTotalExpense,  this.remainingBudget],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },

      options: chartOptions
    });
  }

  getConfirmationValue(value: any) {
    if (value == 'Save click') {
      console.log(value);
    }
  }
  isModalOpen: boolean = false;
  data: string = 'Initial Data';
  async openModal({ title: title, type: type }) {
    this.ModalService.add({
      title: title,
      type: type,
      message: "pass your message ",
      body: "pass body",
      cancelBtnText: "No",
    }).then(async (updatedData) => {
      if (this.chart) {
        this.chart.destroy();
      }
      this.monthlyTotalExpense = 0
      this.getRecentExpenses()
      this.getCurentmonthExpense()
      await this.getcurentMonthBudget()
    })
  }

  getRecentExpenses() {
    interface LoggedInUser {
      userId: string;
      // Add other properties if present
    }
    let temp: LoggedInUser = this.commonservice.getLoggedInUser()

    this.expenseservice.getRecentExpenses(temp).subscribe(
      async (response) => {
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
    this.curentUser = this.commonservice.getLoggedInUser()

    this.expenseservice.getExpense(this.curentUser).subscribe(
      (response) => {
        this.allExpense = response.expense
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
        for (const eachexpense of this.monthlyExpenses) {
          this.monthlyTotalExpense = this.monthlyTotalExpense + eachexpense.expenseAmount

        }
        await this.createChart()
        await this.getExpensesbyCategory()
      },
      (error) => {
        console.error("Error fetching current month expenses:", error);
        // Handle error appropriately, e.g., show a toast message or display a user-friendly error on the UI
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }

  getcurentMonthBudget(){
    this.loginUsers = this.commonservice.getLoggedInUser();
    this.budgetservice.getcurentMonthBudget(this.loginUsers).subscribe(
      async (response) => {
        if(response.budget == null){
          this.monthlyBudget = 0
        }else{

          this.monthlyBudget = response.budget.budgetAmount
        }
        return {
      }
      }
    )
   }

}

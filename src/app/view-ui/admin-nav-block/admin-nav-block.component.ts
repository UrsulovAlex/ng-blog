import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { INestedTreeNodes } from './models/nested-tree-node';


@Component({
  selector: 'app-admin-nav-block',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './admin-nav-block.component.html',
  styleUrls: ['./admin-nav-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNavBlockComponent implements OnChanges{
  @Input() nodes: INestedTreeNodes[] = [];

  treeControl = new NestedTreeControl<INestedTreeNodes>(node => node.children);
  dataSource = new MatTreeNestedDataSource<INestedTreeNodes>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nodes']) {
      this.dataSource.data = this.nodes;
    }
    
  }

  hasChild = (_: number, node: INestedTreeNodes) => !!node.children && node.children.length > 0;

}


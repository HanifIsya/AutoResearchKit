#!/usr/bin/env python3
"""Make ORIGINAL data-grounded example figures. Uses only explicitly SIMULATED counts."""
from pathlib import Path
import csv
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

ROOT=Path(__file__).resolve().parent.parent
DIR=ROOT/'examples'
DIR.mkdir(exist_ok=True)
TP,FP,FN,TN=3,1,3,3
P=TP/(TP+FP); R=TP/(TP+FN); F1=2*P*R/(P+R)
with (DIR/'hypothetical_metrics.csv').open('w',encoding='utf-8',newline='') as f:
    w=csv.writer(f);w.writerow(['metric','value','data_status','independent_unit_count']);w.writerows([['Precision',P,'SIMULATION',10],['Recall',R,'SIMULATION',10],['F1',F1,'SIMULATION',10]])
fig,ax=plt.subplots(figsize=(7.4,3.2))
labels=['Precision','Recall','F1']; vals=[P,R,F1]
bars=ax.barh(labels,vals,color=['#525252','#999999','#6b6b6b'],height=.55)
ax.set_xlim(0,1);ax.invert_yaxis();ax.set_xlabel('Metric value (illustrative scale, 0–1)')
for rect,v in zip(bars,vals): ax.text(v+.016,rect.get_y()+rect.get_height()/2,f'{v:.2f}',va='center',fontsize=10)
ax.set_title('ILLUSTRATION ONLY — simulated 10-message confusion matrix',fontsize=11)
ax.spines[['top','right']].set_visible(False)
fig.tight_layout();fig.savefig(DIR/'example_metrics.png',dpi=220,bbox_inches='tight');plt.close(fig)

fig,ax=plt.subplots(figsize=(8,2.65));ax.set(xlim=(0,10),ylim=(0,3));ax.axis('off')
nodes=[(0.1,'Research\nquestion'),(2.65,'Evidence &\nmethod'),(5.25,'Result &\nuncertainty'),(7.85,'Claim &\nlimits')]
for x,s in nodes:
    ax.add_patch(FancyBboxPatch((x,.87),1.95,1.16,boxstyle='round,pad=0.13,rounding_size=.12',facecolor='#f5f5f5',edgecolor='#333333',linewidth=1.1))
    ax.text(x+.975,1.45,s,ha='center',va='center',fontsize=10)
for x,_ in nodes[:-1]: ax.add_patch(FancyArrowPatch((x+2.00,1.45),(x+2.50,1.45),arrowstyle='-|>',mutation_scale=13,color='#303030',linewidth=1.2))
ax.text(5,2.63,'ORIGINAL PROCESS SCHEMATIC — conceptual, not an evaluated intervention',ha='center',fontsize=10.7)
fig.tight_layout();fig.savefig(DIR/'example_evidence_flow.png',dpi=220,bbox_inches='tight');plt.close(fig)
print('Saved two original example figures, all labels explicitly illustrative')

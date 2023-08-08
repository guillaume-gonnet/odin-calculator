This is a simple calculator built in vanilla JS.
It implements operation priority, internediate results are displayed.
If 2 operators entered consecutively, the last one is kept (so 5*-3 will result in 5-3)

Technical detail: use a buffer to store operations, reducing it each time is possible through the updateBuffer function
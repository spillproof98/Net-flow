from collections import defaultdict, deque

def topo_sort(nodes, edges):
    graph = defaultdict(list)
    indegree = {n["id"]: 0 for n in nodes}

    for e in edges:
        if e["source"] not in indegree or e["target"] not in indegree:
            raise ValueError("Edge references unknown node")

        graph[e["source"]].append(e["target"])
        indegree[e["target"]] += 1

    queue = deque(sorted(
        n for n in indegree if indegree[n] == 0
    ))

    order = []

    while queue:
        current = queue.popleft()
        order.append(current)

        for nxt in graph[current]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    if len(order) != len(nodes):
        cycle_nodes = [
            n for n, d in indegree.items() if d > 0
        ]
        raise ValueError(
            f"Workflow contains a cycle: {cycle_nodes}"
        )

    return order

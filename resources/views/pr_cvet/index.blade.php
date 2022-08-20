<x-guest-layout>

<h1>Цвета</h1>

@foreach ($cvets as $cvet )
<h2>{{ $cvet->title }}</h2>
<p>Коллекция: {{ $cvet->pr_collection_id }}</p>
<p>&nbsp</p>
@endforeach

</x-guest-layout>